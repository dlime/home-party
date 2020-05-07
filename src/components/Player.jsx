import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import Script from "react-load-script";
import { getSpotifyTokenFromHash } from "./spotify/Utils.js";
import SpotifyPlayer from "./spotify/SpotifyPlayer";
import { Helmet } from "react-helmet";

// TODO: move these constants in a config file + comment values
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
  componentDidMount() {
    getSpotifyTokenFromHash();
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
    const {
      selectedSong,
      isPlaying,
      onPlay,
      onPause,
      onPlayClick,
      onEnded,
      onDuration,
      onSeek,
      onProgress,
      onReady,
      onPlayerRef,
    } = this.props;
    const { hostId, host, name, artist } = selectedSong;
    const url = this.getUrl(hostId, host);
    return (
      <React.Fragment>
        <Script
          url="https://sdk.scdn.co/spotify-player.js"
          onCreate={this.handleScriptCreate}
        />
        <Helmet>
          <title>{artist + " - " + name + " @ Home Party"}</title>
        </Helmet>

        <div className="player-wrapper">
          {host !== "Spotify" && (
            <ReactPlayer
              ref={onPlayerRef}
              className="react-player"
              url={url}
              width="100%"
              controls={false}
              playing={isPlaying}
              progressInterval={20}
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
              onEnded={onEnded}
              onDuration={onDuration}
              onSeek={onSeek}
              onProgress={(state) => onProgress(state.playedSeconds)}
              onReady={onReady}
            />
          )}
          {host === "Spotify" && (
            <SpotifyPlayer
              url={url}
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              onPlayClick={onPlayClick}
              onEnded={onEnded}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

Player.propTypes = {
  selectedSong: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
};

export default Player;
