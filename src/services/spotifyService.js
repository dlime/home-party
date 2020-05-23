import axios from "axios";

const searchOptions = "type=track&market=from_token&limit=5";

const spotifyService = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

function setToken(token) {
  spotifyService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function search(query) {
  const response = await spotifyService.get(
    `search?${searchOptions}&q=${query}`
  );
  const formattedResults = response.data.tracks.items.map((item) => {
    return {
      host: "Spotify",
      hostId: item.id,
      artist: item.artists[0].name,
      name: item.name,
    };
  });
  return formattedResults;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    console.error(
      "Unexpected error: " +
        (error.response && error.response.data).error.message
    );
  }

  return Promise.reject(error);
});

export default {
  get: spotifyService.get,
  put: spotifyService.put,
  setToken,
  search,
  spotifyService,
};
