import React from "react";

import {
  spotifyAuthEndpoint,
  spotifyClientId,
  spotifyScopes,
  spotifyRedirectUri,
} from "../config.js";

const getAuthorizationUrl = () => {
  return (
    `${spotifyAuthEndpoint}` +
    `?client_id=${spotifyClientId}` +
    `&redirect_uri=${spotifyRedirectUri}` +
    `&scope=${spotifyScopes}` +
    `&response_type=token`
  );
};

const handleClick = (selectedSong) => {
  localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
};

const SpotifyLogin = ({ selectedSong }) => {
  return (
    <div className="login-wrapper">
      <a
        className="spotifybtn"
        href={getAuthorizationUrl()}
        onClick={() => handleClick(selectedSong)}
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default SpotifyLogin;
