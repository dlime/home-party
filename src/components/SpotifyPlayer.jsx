import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotitySong from "./SpotifySong";
import PropTypes from "prop-types";

const SpotifyPlayer = ({ token, url, songId, isPlaying }) => {
  return (
    <React.Fragment>
      {!token && <SpotifyLogin />}
      {token && (
        <SpotitySong
          token={token}
          url={url}
          songId={songId}
          isPlaying={isPlaying}
        />
      )}
    </React.Fragment>
  );
};

SpotifyPlayer.propTypes = {
  token: PropTypes.string,
  url: PropTypes.string.isRequired,
  songId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SpotifyPlayer;
