export const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";

export const spotifyClientId = "7bc3c9bdb4044375bb470a662b6ae874";
export const spotifyRedirectUri = "http://localhost:3000/redirect";
export const spotifyScopes = [
  // for spotify web player SDK
  "streaming",
  "user-read-email",
  "user-read-private",

  // show favourite button
  "user-library-read",
  "user-library-modify",
];
