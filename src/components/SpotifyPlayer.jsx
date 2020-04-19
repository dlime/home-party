import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotitySong from "./SpotifySong";
import PropTypes from "prop-types";

const SpotifyPlayer = ({ token, url, selectedSong, isPlaying }) => {
  return (
    <React.Fragment>
      {!token && <SpotifyLogin selectedSong={selectedSong} />}
      {token && (
        <SpotitySong
          token={token}
          url={url}
          songId={selectedSong.hostId}
          isPlaying={isPlaying}
        />
      )}
    </React.Fragment>
  );
};

SpotifyPlayer.propTypes = {
  token: PropTypes.string,
  url: PropTypes.string.isRequired,
  selectedSong: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SpotifyPlayer;
