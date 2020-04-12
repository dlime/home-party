import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import Script from "react-load-script";
import SpotitySong from "./SpotifySong";
import {
  spotifyAuthEndpoint,
  spotifyClientId,
  spotifyScopes,
  spotifyRedirectUri,
  getSpotifyTokenFromHash,
} from "../config.js";

// TODO: move these constants in a config file
const youtubeUrlPrefix = "https://www.youtube.com/watch?v=";
const youtubeConfig = {
  controls: 0,
  disablekb: 1,
  fs: 0,
  cc_load_policy: 0,
  iv_load_policy: 3,
  rel: 0,
  modestbranding: 1,
  color: "White",
};

const soundcloudUrlPrefix = "https://soundcloud.com/";
const soundcloudConfig = {
  auto_play: false,
  buying: false,
  sharing: false,
  download: false,
  show_artwork: true,
  show_playcount: false,
  show_user: false,
};

const spotifyUrlPrefix = "spotify:track:";

class Player extends Component {
  state = {
    token: null,
  };

  componentDidMount() {
    const token = getSpotifyTokenFromHash(window.location.hash);
    if (token) {
      // TODO: store token into session + check if expired
      this.setState({ token });
    }
  }

  handleScriptCreate = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log(
        "The Web Playback SDK is ready. We have access to Spotify.Player"
      );
    };
  };

  getUrl = (id, host) => {
    switch (host.toLowerCase()) {
      case "youtube":
        return youtubeUrlPrefix + id;
      case "soundcloud":
        return soundcloudUrlPrefix + id;
      case "spotify":
        return spotifyUrlPrefix + id;
      default:
        return "";
    }
  };

  render() {
    const { id, host, isPlaying, onPlay, onPause } = this.props;
    const { token } = this.state;
    const url = this.getUrl(id, host);
    return (
      <React.Fragment>
        <Script
          url="https://sdk.scdn.co/spotify-player.js"
          onCreate={this.handleScriptCreate}
        />

        <div className="player-wrapper">
          {host !== "Spotify" && (
            <ReactPlayer
              className="react-player"
              url={url}
              width="100%"
              controls={false}
              playing={isPlaying}
              config={{
                youtube: {
                  playerVars: youtubeConfig,
                },
                soundcloud: {
                  options: soundcloudConfig,
                },
              }}
              onPlay={onPlay}
              onPause={onPause}
            />
          )}

          {/* TODO: Extract into a unique Spotify component */}
          {host === "Spotify" && !token && (
            // TODO: extract this as SpotifyLogin component
            <div className="login-wrapper">
              <a
                className="spotifybtn"
                href={`${spotifyAuthEndpoint}?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUri}&scope=${spotifyScopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </a>
            </div>
          )}
          {host === "Spotify" && token && (
            <SpotitySong
              playerName="HOMEPARTY_PLAYER"
              token={token}
              url={url}
              isPlaying={isPlaying}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default Player;
