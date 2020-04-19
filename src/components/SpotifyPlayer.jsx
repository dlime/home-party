import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotitySong from "./SpotifySong";
import PropTypes from "prop-types";

const handleLoginClick = (selectedSong, isPlaying) => {
  localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
  localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
};

const SpotifyPlayer = ({ token, url, selectedSong, isPlaying }) => {
  return (
    <React.Fragment>
      {!token && (
        <SpotifyLogin
          handleLoginClick={() => handleLoginClick(selectedSong, isPlaying)}
        />
      )}
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
