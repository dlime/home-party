import React from "react";

import {
  spotifyAuthEndpoint,
  spotifyClientId,
  spotifyScopes,
  spotifyRedirectUri,
} from "../config.js";

const SpotifyLogin = () => {
  return (
    <div className="login-wrapper">
      <a
        className="spotifybtn"
        href={`${spotifyAuthEndpoint}?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUri}&scope=${spotifyScopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default SpotifyLogin;
