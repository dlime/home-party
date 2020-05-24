export const songs = [
  {
    artist: "Daft Punk",
    name: "Around the World",
    duration: "160",
    host: "YouTube",
    hostId: "LKYPYj2XX80",
  },
  {
    artist: "Chemical Brothers",
    name: "Star Guitar",
    duration: "100",
    host: "Spotify",
    // https://developer.spotify.com/console/get-search-item/
    hostId: "19mC6xktT1JyyycK6cQaXA",
  },
  {
    artist: "Aphex Twin",
    name: "Polynomial-C",
    duration: "110",
    host: "SoundCloud",
    hostId: "r-srecords/aphex-twin-polynomial-c-1",
  },
  {
    artist: "Aphex Twin",
    name: "Didgeridoo",
    duration: "110",
    host: "SoundCloud",
    hostId: "r-srecords/aphex-twin-digeridoo-2",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8-1",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8-2",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8-3",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8-4",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8-5",
  },
  {
    artist: "Cassius",
    name: "Cassius 1999",
    duration: "160",
    host: "YouTube",
    hostId: "_PmU6G_Z4n8-6",
  },
];

export function getSongs() {
  return songs.filter((song) => song);
}
