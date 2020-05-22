import axios from "axios";

const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
const youtubeSearchOptions =
  "part=id,snippet&type=video&videoEmbeddable=true&videoSyndicated=true";

const youtubeService = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3`,
});

function searchSong(query) {
  return youtubeService.get(
    `search?${youtubeSearchOptions}&key=${youtubeApiKey}&q=${query}`
  );
}

export default {
  get: youtubeService.get,
  put: youtubeService.put,
  searchSong,
  youtubeService,
};
