import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const youtubeApiPrefix = "https://www.youtube.com/watch?v=";
const youtubeConfig = {
  controls: 0,
  disablekb: 1,
  fs: 0,
  cc_load_policy: 0,
  iv_load_policy: 3,
  rel: 0,
  modestbranding: 1,
  color: "White"
};

const soundcloudApiPrefix = "https://soundcloud.com/";
const soundcloudConfig = {
  auto_play: false,
  buying: false,
  sharing: false,
  download: false,
  show_artwork: true,
  show_playcount: false,
  show_user: false
};

function getUrl(id, host) {
  switch (host.toLowerCase()) {
    case "youtube":
      return youtubeApiPrefix + id;
    case "soundcloud":
      return soundcloudApiPrefix + id;
    case "spotify":
    default:
      return "";
  }
}

function Player({ id, host, isPlaying, onPlay, onPause }) {
  const url = getUrl(id, host);

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        controls={false}
        playing={isPlaying}
        // height="100%"
        config={{
          youtube: {
            playerVars: youtubeConfig
          },
          soundcloud: {
            options: soundcloudConfig
          }
        }}
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired
};

export default Player;
