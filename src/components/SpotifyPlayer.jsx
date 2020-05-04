import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import SpotitySong from "./SpotifySong";
import PropTypes from "prop-types";
import moment from "moment";

const handleLoginClick = (selectedSong, isPlaying) => {
  localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
  localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
};

const getToken = () => {
  const token = localStorage.getItem("spotifyToken");
  const expiration = localStorage.getItem("spotifyTokenExpireDatetime");
  if (!token || !expiration) {
    return null;
  }

  if (moment().isSameOrAfter(expiration)) {
    return null;
  }

  return token;
};

const SpotifyPlayer = ({ url, selectedSong, isPlaying }) => {
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
        />
      )}
    </React.Fragment>
  );
};

SpotifyPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  selectedSong: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SpotifyPlayer;
