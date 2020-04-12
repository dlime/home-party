import React, { Component } from "react";
// import Player from "../Player";

class SpotitySong extends Component {
  state = {
    player: null,
    isReady: false,
    firstTimeClicked: true,
    isPlaying: false,
    currentTrack: {
      album: {
        images: [{ url: "" }],
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms: 0,
    },

    currentDeviceId: "",
    deviceId: "",
    devices: [],
    error: "",
    errorType: "",
    isActive: false,
    isInitializing: false,
    isSaved: false,
    isUnsupported: false,
    needsUpdate: false,
    track: this.emptyTrack,
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

  async componentDidMount() {
    await this.waitForSpotifyWebPlaybackSDKToLoad();
    await this.initializePlayer();
    await this.setDevice();
  }

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
      console.log("player_state_changed", state);
      this.setState({ currentTrack: state.track_window.current_track });
    });
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      this.setState({ isReady: true });
    });
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    // player.addListener("ready", this.handlePlayerStatus);
    // player.addListener("not_ready", this.handlePlayerStatus);
    // player.addListener("player_state_changed", this.handlePlayerStateChanges);
    // player.addListener("initialization_error", error =>
    //   this.handlePlayerErrors("initialization_error", error.message)
    // );
    // player.addListener("authentication_error", error =>
    //   this.handlePlayerErrors("authentication_error", error.message)
    // );
    // player.addListener("account_error", error =>
    //   this.handlePlayerErrors("account_error", error.message)
    // );
    // player.addListener("playback_error", error =>
    //   this.handlePlayerErrors("playback_error", error.message)
    // );

    await player.connect();
    this.setState({ player });
  };

  async componentWillUnmount() {
    let player = this.state.player;
    if (player) {
      await player.disconnect();
    }

    this.setState({ player });
  }

  handleButtonClick = async () => {
    if (!this.state.isReady) {
      console.log("handleButtonClick player not ready.");
      return;
    }

    if (this.state.firstTimeClicked) {
      this.play("spotify:track:7xGfFoTpQ2E7fRF5lN10tr");
      this.setState({ firstTimeClicked: false });
      return;
    }

    await this.state.player.togglePlay();
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

  render() {
    return (
      <React.Fragment>
        {/* <Player
          item={this.state.currentTrack}
          is_playing={true}
          progress_ms={0}
        /> */}
        <button
          enabled={this.state.isReady.toString()}
          onClick={this.handleButtonClick}
        >
          PLAY/PAUSE
        </button>
      </React.Fragment>
    );
  }
}

export default SpotitySong;
