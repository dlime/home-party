import React, { Component } from "react";

const printDebug = false;

class SpotitySong extends Component {
  state = {
    player: null,
    playerState: { paused: true },
    isReady: false,
    firstTimeClicked: true,
    currentTrack: {
      name: "",
      artists: [{ name: "" }],
      album: { images: [{}, {}, { url: "" }] },
    },
  };

  async componentDidMount() {
    await this.waitForSpotifyWebPlaybackSDKToLoad();
    await this.initializePlayer();
    await this.setDevice();
  }

  async componentWillUnmount() {
    let player = this.state.player;
    if (player) {
      await player.disconnect();
    }

    this.setState({ player });
  }

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
    const { playerName, token } = this.props;
    const player = new window.Spotify.Player({
      name: playerName,
      getOAuthToken: (callback) => callback(token),
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error("initialization_error", message);
    });
    player.addListener("authentication_error", ({ message }) => {
      console.error("authentication_error", message);
    });
    player.addListener("account_error", ({ message }) => {
      console.error("account_error", message);
    });
    player.addListener("playback_error", ({ message }) => {
      console.error("playback_error", message);
    });
    player.addListener("player_state_changed", (state) => {
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

    player.addListener("ready", ({ device_id }) => {
      // TODO: disable play/pause button until everything is loaded
      console.log("Ready with Device ID", device_id);
      this.setState({ isReady: true });
      if (this.props.isPlaying) {
        this.play(this.props.url);
      }
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    await player.connect();
    this.setState({ player });
  };

  setDevice = async () => {
    const {
      _options: { getOAuthToken, id },
    } = this.state.player;

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
    } = this.state.player;

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
      console.log("handleButtonClick player not ready.");
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

      await this.state.player.resume();
    }

    if (prevProps.isPlaying && !isPlaying && !playerState.paused) {
      await this.state.player.pause();
    }
    // TODO: implement a mechanysm to 100% sync with play/pause button state
    // (e.g. user clicks when song is not ready)
  }

  render() {
    const { currentTrack, playerState } = this.state;
    const { isPlaying } = this.props;
    return (
      <React.Fragment>
        <div
          className="spotify-wrapper"
          style={{
            backgroundImage: `url(${this.state.currentTrack.album.images[2].url})`,
          }}
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

export default SpotitySong;
