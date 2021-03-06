import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotitySong from "./SpotifySong";
import PropTypes from "prop-types";
import { getTokenFromLocalStorage } from "./Utils";

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
  onDuration,
  seekTo,
}) => {
  const token = getTokenFromLocalStorage();
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
          seekTo={seekTo}
          songId={selectedSong.hostId}
          isPlaying={isPlaying}
          onPlayClick={onPlayClick}
          onEnded={onEnded}
          onProgress={onProgress}
          onDuration={onDuration}
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
  onProgress: PropTypes.func.isRequired,
  onDuration: PropTypes.func.isRequired,
};

export default SpotifyPlayer;
