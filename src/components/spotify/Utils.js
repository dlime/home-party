import moment from "moment";
import spotifyService from "../../services/spotifyService";

export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "7bc3c9bdb4044375bb470a662b6ae874";
export const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT;
export const tokenScopes = [
  // for spotify web player SDK
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",

  // show favourite button
  "user-library-read",
  "user-library-modify",
].join("%20");

export const getSpotifyTokenFromHash = () => {
  if (!window.location.hash) {
    return;
  }

  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  const expirationDatetime = moment().add(hash.expires_in, "seconds");
  localStorage.setItem(
    "spotifyTokenExpireDatetime",
    JSON.stringify(expirationDatetime)
  );
  localStorage.setItem("spotifyToken", hash.access_token);
  spotifyService.setToken(hash.access_token);

  window.location.hash = "";
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("spotifyToken");
  const expiration = JSON.parse(
    localStorage.getItem("spotifyTokenExpireDatetime")
  );
  if (!token || !expiration) {
    return null;
  }

  if (moment().isSameOrAfter(moment(expiration))) {
    return null;
  }

  return token;
};
