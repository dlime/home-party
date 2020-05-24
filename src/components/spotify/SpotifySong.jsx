import React, { Component } from "react";
import PropTypes from "prop-types";
import spotifyService from "../../services/spotifyService";

const printDebug = false;

class SpotitySong extends Component {
  state = {
    webPlaybackSdk: null,
    isReady: false,
    firstTimeClicked: true,
    playerState: { paused: true },
    currentTrack: {
      name: "",
      artists: [{ name: "" }],
      album: { images: [{ url: "" }, { url: "" }, { url: "" }] },
    },
    progressValue: 0, // TODO: maybe remove
  };
  _isMounted = false; // Used to prevent setStates in Spotify callbacks during shutdown

  async componentDidMount() {
    this._isMounted = true;
    await this.waitForSpotifyWebPlaybackSDKToLoad();
    await this.initializePlayer();
    await this.updateCurrentTrack();
  }

  async componentWillUnmount() {
    this._isMounted = false;
    let webPlaybackSdk = this.state.webPlaybackSdk;
    if (webPlaybackSdk) {
      await webPlaybackSdk.disconnect();
    }

    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async componentDidUpdate(prevProps) {
    if (!this.state.isReady) {
      return;
    }
    await this.manageTrackChange(prevProps);
    await this.manageTogglePlayClick(prevProps);
    await this.manageSeekTo(prevProps);
  }

  manageTrackChange = async (prevProps) => {
    const { songId, isPlaying, url } = this.props;

    if (prevProps.songId === songId) {
      return;
    }

    await this.updateCurrentTrack();
    if (isPlaying) {
      this.play(url);
    }
  };

  manageTogglePlayClick = async (prevProps) => {
    // TODO: implement a mechanysm to 100% sync with play/pause button state
    // (e.g. prevent user clicks when song is not ready)
    const { url, isPlaying } = this.props;
    const { firstTimeClicked, playerState, webPlaybackSdk } = this.state;
    if (!prevProps.isPlaying && isPlaying && playerState.paused) {
      if (firstTimeClicked) {
        this.play(url);
        this.setState({ firstTimeClicked: false });
        return;
      }

      await webPlaybackSdk.resume();
    }

    if (prevProps.isPlaying && !isPlaying && !playerState.paused) {
      await webPlaybackSdk.pause();
    }
  };

  manageSeekTo = async (prevProps) => {
    if (prevProps.seekTo !== this.props.seekTo) {
      await this.state.webPlaybackSdk.seek(this.props.seekTo * 1000);
    }
  };

  updateCurrentTrack = async () => {
    const { songId } = this.props;
    try {
      const response = await spotifyService.get(`tracks/${songId}`);
      const currentTrack = response.data;
      this.setState({ currentTrack });
      this.props.onDuration(currentTrack.duration_ms / 1000);
    } catch (error) {
      console.log("Error while getting Album cover");
    }
  };

  waitForSpotifyWebPlaybackSDKToLoad = async () => {
    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          console.log(
            "The Web Playback SDK is ready. We have access to Spotify.Player"
          );
          resolve(window.Spotify);
        };
      }
    });
  };

  initializePlayer = async () => {
    if (this.state.webPlaybackSdk) {
      console.log("Web Playback already initialized.");
      return;
    }

    const { token } = this.props;
    const webPlaybackSdk = new window.Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (callback) => callback(token),
    });

    webPlaybackSdk.addListener("initialization_error", ({ message }) => {
      console.error("initialization_error (EME browser support?)", message);
    });
    webPlaybackSdk.addListener("authentication_error", ({ message }) => {
      console.error("authentication_error", message);
    });
    webPlaybackSdk.addListener("account_error", ({ message }) => {
      console.error("account_error", message);
    });
    webPlaybackSdk.addListener("playback_error", ({ message }) => {
      console.error("playback_error", message);
    });
    webPlaybackSdk.addListener("player_state_changed", (playerState) => {
      if (!playerState || !this._isMounted) {
        return;
      }

      if (printDebug) {
        console.log("player_state_changed", playerState);
        console.log("current track", playerState.track_window.current_track);
      }
      this.setState({ currentTrack: playerState.track_window.current_track });

      // Add updateTime field to compute progress bar between the callbacks
      playerState.updateTime = performance.now();
      this.setState({ playerState });

      this.checkIfSongEnded(playerState);

      this.props.onDuration(playerState.duration / 1000);
    });

    webPlaybackSdk.addListener("ready", ({ device_id }) => {
      // TODO: disable play/pause button until everything is loaded
      console.log("Ready with Device ID", device_id);
      this.setState({ isReady: true });
      this.interval = setInterval(this.getProgressValue, 20);
      if (this.props.isPlaying) {
        this.play(this.props.url);
      }
    });

    webPlaybackSdk.addListener("not_ready", ({ device_id }) => {
      console.error("Device ID has gone offline", device_id);
    });

    const didSdkConnect = await webPlaybackSdk.connect();
    if (!didSdkConnect) {
      console.error("FAIL: Web Playback SDK didn't connect to Spotify");
    } else {
      console.log("SUCCESS: Web Playback SDK connected to Spotify");
    }

    this.setState({ webPlaybackSdk });
  };

  play = (spotifyUri) => {
    const {
      _options: { id },
    } = this.state.webPlaybackSdk;

    spotifyService.put(`me/player/play?device_id=${id}`, {
      uris: [spotifyUri],
    });
  };

  checkIfSongEnded = (state) => {
    if (state.paused && state.duration - state.position < 1000) {
      this.props.onEnded();
    }
  };

  updateProgressBar(progressValueMilliseconds) {
    const progressValueSeconds = progressValueMilliseconds / 1000;
    this.setState({ progressValue: progressValueSeconds });
    this.props.onProgress(progressValueSeconds);
  }

  getProgressValue = () => {
    const { playerState } = this.state;

    if (!playerState) {
      this.updateProgressBar(0);
      return;
    }

    if (playerState.paused) {
      const progressValue = playerState.position ? playerState.position : 0;
      this.updateProgressBar(progressValue);
      return;
    }

    const position =
      playerState.position + (performance.now() - playerState.updateTime);
    const progressValue =
      position > playerState.duration ? playerState.duration : position;
    this.updateProgressBar(progressValue);
  };

  getAlbumCoverUrl = (currentTrack) => {
    const albumCoverImage = currentTrack.album.images.find(
      (image) => image.height > 500
    );
    return albumCoverImage ? albumCoverImage.url : "";
  };

  spotifySongToEnd = (event) => {
    const { webPlaybackSdk, currentTrack } = this.state;
    webPlaybackSdk.seek(currentTrack.duration_ms - 7000);
    event.stopPropagation();
  };

  render() {
    const { currentTrack, playerState, progressValue } = this.state;
    const { isPlaying, onPlayClick } = this.props;

    const albumCoverUrl = this.getAlbumCoverUrl(currentTrack);
    return (
      <React.Fragment>
        <div
          className="spotify-wrapper cursor-pointer"
          style={{
            backgroundImage: `url(${albumCoverUrl})`,
          }}
          onClick={onPlayClick}
        >
          {printDebug && (
            <div>
              <h2>
                <b>Track name:</b> {currentTrack.name}
              </h2>
              <h2>
                <b>Artist name:</b>
                {currentTrack.artists[0].name}
              </h2>
              <h2>
                <b>Player paused:</b> {playerState.paused ? "Yes" : "No"}
              </h2>
              <h2>
                <b>Is playing?</b> {isPlaying ? "Yes" : "No"}
              </h2>
              <h2>
                <b>Progress Value</b> {progressValue}
              </h2>
              <button
                className="btn btn-warning"
                onClick={(event) => this.spotifySongToEnd(event)}
              >
                To End
              </button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

SpotitySong.propTypes = {
  token: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  songId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onDuration: PropTypes.func.isRequired,
};

export default SpotitySong;
