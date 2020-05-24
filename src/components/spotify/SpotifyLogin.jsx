import React from "react";

import { getAuthorizationUrl } from "./Utils.js";

const SpotifyLogin = ({ handleLoginClick }) => {
  return (
    <div className="login-wrapper">
      <a
        className="btn-spotify"
        href={getAuthorizationUrl()}
        onClick={handleLoginClick}
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default SpotifyLogin;
