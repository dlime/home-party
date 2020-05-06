import React, { Component } from "react";
import SearchBox from "./common/SearchBox";
import SongsTable from "./SongsTable";
import { getSongs } from "../services/fakePlaylistService";
import _ from "lodash";
import Player from "./Player";
import PlayerControls from "./PlayerControls";
import ReactPlayer from "react-player";

class ShowPlaylist extends Component {
  state = {
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },

    songs: [],
    selectedSong: { hostId: "", host: "" },
    isPlaying: false,
  };

  componentDidMount() {
    const songs = getSongs();
    this.setState({ songs });
    this.manageSpotifyLoginRedirect(songs);
  }

  manageSpotifyLoginRedirect = (songs) => {
    const selectedSong = this.getSelectedSongBeforeRedirect(songs);
    const isPlaying = this.getIsPlayingBeforeRedirect();
    this.setState({ selectedSong, isPlaying });
  };

  getSelectedSongBeforeRedirect = (songs) => {
    const selectedSong = this.readAndRemoveFromLocalStorage("selectedSong");
    if (!selectedSong || !selectedSong._id) {
      return songs.length > 0 ? songs[0] : null;
    }

    return songs.find((song) => song._id === selectedSong._id);
  };

  getIsPlayingBeforeRedirect = () => {
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

  handlePreviousButtonClick = () => {
    const { selectedSong } = this.state;
    const sortedSong = this.getSortedSongs();
    const index = sortedSong.indexOf(selectedSong);
    if (index < 0) {
      console.error("Previous song click: current song not found");
      return;
    }
    const previousIndex = index === 0 ? 0 : index - 1;
    this.setState({ selectedSong: sortedSong[previousIndex] });
  };

  handleNextButtonClick = () => {
    const { selectedSong } = this.state;
    const sortedSong = this.getSortedSongs();
    const index = sortedSong.indexOf(selectedSong);
    if (index < 0) {
      console.error("Next song click: current song not found");
      return;
    }
    const nextIndex = index === sortedSong.length - 1 ? index : index + 1;
    this.setState({ selectedSong: sortedSong[nextIndex] });
  };

  handleSongEnded = () => {
    // TODO: workaround for bug https://github.com/CookPete/react-player/issues/879
    if (this.state.selectedSong.host.toLowerCase() === "soundcloud") {
      this.setState({ isPlaying: true });
    }
    this.handleNextButtonClick();
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
                onPlayClick={this.handlePlayButtonClick}
                onEnded={this.handleSongEnded}
              />
            </div>

            <div className="col">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <SongsTable
                data={data}
                sortColumn={sortColumn}
                selectedSong={selectedSong}
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
          onPreviousClick={this.handlePreviousButtonClick}
          onNextClick={this.handleNextButtonClick}
        />
      </React.Fragment>
    );
  }
}

export default ShowPlaylist;
