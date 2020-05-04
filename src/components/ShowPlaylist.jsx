import React, { Component } from "react";
import SearchBox from "./common/SearchBox";
import SongsTable from "./SongsTable";
import { getSongs } from "../services/fakePlaylistService";
import _ from "lodash";
import Player from "./Player";
import PlayerControls from "./PlayerControls";

class ShowPlaylist extends Component {
  state = {
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },

    songs: [],
    selectedSong: { hostId: "", host: "" },
    isPlaying: false,
  };

  getSelectedSong = (songs) => {
    const selectedSong = this.readAndRemoveFromLocalStorage("selectedSong");
    if (selectedSong) {
      return selectedSong;
    }

    return songs.length > 0 ? songs[0] : null;
  };

  getIsPlaying = () => {
    const isPlaying = this.readAndRemoveFromLocalStorage("isPlaying");
    return isPlaying ? true : false;
  };

  readAndRemoveFromLocalStorage = (key) => {
    const storageValue = localStorage.getItem(key);
    if (!storageValue) {
      return null;
    }

    localStorage.removeItem(key);
    return JSON.parse(storageValue);
  };

  componentDidMount() {
    const songs = getSongs();
    // Manage a possibly redirect from Spotify login
    const selectedSong = this.getSelectedSong(songs);
    const isPlaying = this.getIsPlaying();
    this.setState({ songs, selectedSong, isPlaying });
  }

  handleDeleteButton = async (id) => {
    const { songs } = this.state;
    const originalSongs = songs;

    const newSongs = originalSongs.filter((song) => {
      return song._id !== id;
    });

    this.setState({ songs: newSongs });
  };

  handleSongClick = (selectedSong) => {
    this.setState({ selectedSong });
  };

  handleSortClick = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handlePlayButtonClick = () => {
    const isPlaying = !this.state.isPlaying;
    this.setState({ isPlaying });
  };

  // Note: callback for external player play/pause
  handlePlayerOnPlay = () => {
    this.setState({ isPlaying: true });
  };

  // Note: callback for external player play/pause
  handlePlayerOnPause = () => {
    this.setState({ isPlaying: false });
  };

  getSortedSongs = () => {
    const { songs, sortColumn, searchQuery } = this.state;

    let filteredSongs = songs;
    if (searchQuery) {
      filteredSongs = songs.filter((song) =>
        //TODO: improve search method
        song.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sortedSongs = _.orderBy(
      filteredSongs,
      [sortColumn.path],
      [sortColumn.order]
    );

    return sortedSongs;
  };

  render() {
    const { searchQuery, sortColumn, selectedSong, isPlaying } = this.state;
    const data = this.getSortedSongs();

    return (
      <React.Fragment>
        <main className="container">
          <div className="row">
            <div className="col">
              <Player
                selectedSong={selectedSong}
                isPlaying={isPlaying}
                onPlay={this.handlePlayerOnPlay}
                onPause={this.handlePlayerOnPause}
              />
            </div>

            <div className="col">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <SongsTable
                data={data}
                sortColumn={sortColumn}
                onSongClick={this.handleSongClick}
                onDelete={this.handleDeleteButton}
                onSort={this.handleSortClick}
              />
            </div>
          </div>
        </main>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayClick={this.handlePlayButtonClick}
        />
      </React.Fragment>
    );
  }
}

export default ShowPlaylist;
