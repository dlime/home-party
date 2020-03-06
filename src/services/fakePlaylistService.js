export const songs = [
  {
    _id: "5b21ca3eeb7f6fbccd471811",
    artist: "Daft Punk",
    name: "Around the World",
    duration: "160",
    api: "YouTube"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    artist: "Chemical Brothers",
    name: "Star Guitar",
    duration: "100",
    api: "Spotify"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    artist: "Aphex Twin",
    name: "Analogue Bubblebath",
    duration: "110",
    api: "Soundcloud"
  }
];

export function getSongs() {
  return songs.filter(song => song);
}
