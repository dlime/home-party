import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

Player.propTypes = {
  id: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired
};

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

function getUrl(id, host) {
  switch (host.toLowerCase()) {
    case "youtube":
      return youtubeApiPrefix + id;
    case "spotify":
    case "soundcloud":
    default:
      return "";
  }
}

function Player({ id, host }) {
  const url = getUrl(id, host);

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        // height="100%"
        // youtubeConfig={{
        //   playerVars: { controls: 0, disablekb: 0 }
        // }}
        config={{
          youtube: {
            playerVars: youtubeConfig
          }
        }}
      />
    </div>
  );
}

export default Player;
