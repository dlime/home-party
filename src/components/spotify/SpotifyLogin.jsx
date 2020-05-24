import React from "react";

import { getAuthorizationUrl } from "./Utils.js";

const SpotifyLogin = ({ handleLoginClick }) => {
  return (
    <div className="spotify-wrapper">
      <div className="white-text-centered">
        <p>In order to play Spotify songs you need a Premium account.</p>
        <p>Supported browsers: Chrome / Firefox / Edge</p>
        <br></br>
        <a
          className="btn-spotify"
          href={getAuthorizationUrl()}
          onClick={handleLoginClick}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
};

export default SpotifyLogin;
