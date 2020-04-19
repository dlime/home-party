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

const SpotifyLogin = ({ handleLoginClick }) => {
  return (
    <div className="login-wrapper">
      <a
        className="spotifybtn"
        href={getAuthorizationUrl()}
        onClick={handleLoginClick}
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default SpotifyLogin;
