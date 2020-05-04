import React, { Component } from "react";
import PropTypes from "prop-types";

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
  };

  async componentDidMount() {
    await this.waitForSpotifyWebPlaybackSDKToLoad();
    await this.initializePlayer();
    await this.getAlbumCover();
    // await this.setDevice();
  }

  async componentWillUnmount() {
    let webPlaybackSdk = this.state.webPlaybackSdk;
    if (webPlaybackSdk) {
      webPlaybackSdk.disconnect();
    }
  }

  getAlbumCover = async () => {
    if (!this.state.webPlaybackSdk) {
      return;
    }

    const {
      _options: { getOAuthToken },
    } = this.state.webPlaybackSdk;

    const { songId } = this.props;

    getOAuthToken(async (access_token) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${songId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          throw Error("Error while getting track info", response.statusText);
        }
        const currentTrack = await response.json();
        this.setState({ currentTrack });
      } catch (error) {
        console.log(error);
      }
    });
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
      console.error("initialization_error", message);
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
    webPlaybackSdk.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }
      if (printDebug) {
        console.log("player_state_changed", state);
        console.log("current track", state.track_window.current_track);
      }
      this.setState({ currentTrack: state.track_window.current_track });
      this.setState({ playerState: state });
    });

    webPlaybackSdk.addListener("ready", ({ device_id }) => {
      // TODO: disable play/pause button until everything is loaded
      console.log("Ready with Device ID", device_id);
      this.setState({ isReady: true });
      if (this.props.isPlaying) {
        this.play(this.props.url);
      }
    });

    webPlaybackSdk.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    console.log("Request to connect SDK....");
    const isSdkConnected = await webPlaybackSdk.connect();
    if (!isSdkConnected) {
      console.error("    FAIL: Web Playback SDK didn't connect to Spotify");
    } else {
      console.log("   SUCCESS: Web Playback SDK connected to Spotify");
    }

    this.setState({ webPlaybackSdk });
  };

  setDevice = async () => {
    const {
      _options: { getOAuthToken, id },
    } = this.state.webPlaybackSdk;

    getOAuthToken((access_token) => {
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify({ device_ids: [id], play: true }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };

  play = (spotifyUri) => {
    const {
      _options: { getOAuthToken, id },
    } = this.state.webPlaybackSdk;

    getOAuthToken((access_token) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          uris: [spotifyUri],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };

  async componentDidUpdate(prevProps) {
    if (!this.state.isReady) {
      return;
    }

    const { url, isPlaying } = this.props;
    const { firstTimeClicked, playerState } = this.state;

    if (!prevProps.isPlaying && isPlaying && playerState.paused) {
      if (firstTimeClicked) {
        this.play(url);
        this.setState({ firstTimeClicked: false });
        return;
      }

      await this.state.webPlaybackSdk.resume();
    }

    if (prevProps.isPlaying && !isPlaying && !playerState.paused) {
      await this.state.webPlaybackSdk.pause();
    }
    // TODO: implement a mechanysm to 100% sync with play/pause button state
    // (e.g. user clicks when song is not ready)
  }

  getAlbumCoverUrl = (currentTrack) => {
    const albumCoverImage = currentTrack.album.images.find(
      (image) => image.height > 500
    );
    return albumCoverImage ? albumCoverImage.url : "";
  };

  render() {
    const { currentTrack, playerState } = this.state;
    const { isPlaying, onPlayClick } = this.props;

    const albumCoverUrl = this.getAlbumCoverUrl(currentTrack);
    return (
      <React.Fragment>
        <div
          className="spotify-wrapper"
          style={{
            backgroundImage: `url(${albumCoverUrl})`,
            cursor: "pointer",
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
};

export default SpotitySong;
