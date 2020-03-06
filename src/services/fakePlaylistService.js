export const songs = [
  {
    _id: "5b21ca3eeb7f6fbccd471811",
    artist: "Daft Punk",
    name: "Around the World",
    duration: "160",
    host: "YouTube",
    host_id: "LKYPYj2XX80"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    artist: "Chemical Brothers",
    name: "Star Guitar",
    duration: "100",
    host: "Spotify",
    host_id: "xxxxxx"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    artist: "Aphex Twin",
    name: "Polynomial-C",
    duration: "110",
    host: "Soundcloud",
    host_id: "r-srecords/aphex-twin-polynomial-c-1"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471",
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    host_id: "_PmU6G_Z4n8"
  }
];

export function getSongs() {
  return songs.filter(song => song);
}
