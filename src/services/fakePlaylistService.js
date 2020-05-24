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
    artist: "Demuja",
    name: "Onyx",
    duration: "160",
    host: "Spotify",
    hostId: "3ZRcb4aQX7srJsErJ07Uvp",
  },
  {
    artist: "Mall Grab",
    name: "Positive Energy Forever",
    duration: "160",
    host: "Spotify",
    hostId: "5G0x8Z9aSms3ZTF79vEE6u",
  },
  {
    artist: "Kornél Kovács",
    name: "Nap",
    duration: "160",
    host: "SoundCloud",
    hostId: "dario-limo/kk-nap",
  },
  {
    artist: "Pelvis",
    name: "Dance Freak (Mall Grab Workers Union remix)",
    duration: "160",
    host: "SoundCloud",
    hostId:
      "mixmag-1/premiere-pelvis-dance-freak-mall-grab-workers-union-remix",
  },
  {
    artist: "Bicep",
    name: "Closing Sequence",
    duration: "160",
    host: "SoundCloud",
    hostId: "50weapons/bicep-closing-sequence-full",
  },
  {
    artist: "No_4mat",
    name: "1992",
    duration: "160",
    host: "YouTube",
    hostId: "14CGp0VF2TU",
  },
];

export function getSongs() {
  return songs.filter((song) => song);
}
