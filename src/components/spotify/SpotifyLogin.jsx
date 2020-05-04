import React from "react";

import {
  authorizationEndpoint,
  clientId,
  tokenScopes,
  redirectUri,
} from "./Utils.js";

const getAuthorizationUrl = () => {
  return (
    `${authorizationEndpoint}` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${tokenScopes}` +
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
