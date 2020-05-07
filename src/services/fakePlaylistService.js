export const songs = [
  {
    _id: "5b21ca3eeb7f6fbccd471811",
    artist: "Daft Punk",
    name: "Around the World",
    duration: "160",
    host: "YouTube",
    hostId: "LKYPYj2XX80",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    artist: "Chemical Brothers",
    name: "Star Guitar",
    duration: "100",
    host: "Spotify",
    // https://developer.spotify.com/console/get-search-item/
    hostId: "19mC6xktT1JyyycK6cQaXA",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    artist: "Aphex Twin",
    name: "Polynomial-C",
    duration: "110",
    host: "SoundCloud",
    hostId: "r-srecords/aphex-twin-polynomial-c-1",
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718",
    artist: "Aphex Twin",
    name: "Didgeridoo",
    duration: "110",
    host: "SoundCloud",
    hostId: "r-srecords/aphex-twin-digeridoo-2",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471",
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8",
  },
];

export function getSongs() {
  return songs.filter((song) => song);
}
