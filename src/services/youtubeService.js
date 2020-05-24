import axios from "axios";

const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
const youtubeSearchOptions =
  "part=id,snippet&type=video&videoEmbeddable=true&videoSyndicated=true";

const youtubeService = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3`,
});

async function search(query) {
  const response = await youtubeService.get(
    `search?${youtubeSearchOptions}&key=${youtubeApiKey}&q=${query}`
  );

  const formattedResults = response.data.items.map((item) => {
    return {
      host: "YouTube",
      hostId: item.id.videoId,
      artist: item.snippet.title,
      name: "",
    };
  });

  return formattedResults;
}

export default {
  get: youtubeService.get,
  put: youtubeService.put,
  search,
  youtubeService,
};
