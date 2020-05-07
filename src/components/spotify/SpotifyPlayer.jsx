import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotitySong from "./SpotifySong";
import PropTypes from "prop-types";
import { getToken } from "./Utils";

const handleLoginClick = (selectedSong, isPlaying) => {
  localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
  localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
};

const SpotifyPlayer = ({
  url,
  selectedSong,
  isPlaying,
  onPlayClick,
  onEnded,
  onProgress,
}) => {
  const token = getToken();
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
          onPlayClick={onPlayClick}
          onEnded={onEnded}
          onProgress={onProgress}
        />
      )}
    </React.Fragment>
  );
};

SpotifyPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  selectedSong: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
};

export default SpotifyPlayer;
