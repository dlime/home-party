export const songs = [
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    artist: "Daft Punk",
    name: "Around the World",
    api: "YouTube"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    artist: "Chemical Brothers",
    name: "Star Guitar",
    api: "Spotify"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    artist: "Aphex Twin",
    name: "Analogue Bubblebath",
    api: "Soundcloud"
  }
];

export function getPlaylist() {
  return songs.filter(song => song);
}
