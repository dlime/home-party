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
    selectedSong: { host_id: "", host: "" },
    isPlaying: false
  };

  componentDidMount() {
    const songs = getSongs();
    const selectedSong = songs.length > 0 ? songs[0] : null;
    this.setState({ songs, selectedSong });
  }

  handleDeleteButton = async id => {
    const { songs } = this.state;
    const originalSongs = songs;

    const newSongs = originalSongs.filter(song => {
      return song._id !== id;
    });

    this.setState({ songs: newSongs });
  };

  handleSongClick = selectedSong => {
    this.setState({ selectedSong });
  };

  handleSortClick = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handlePlayButtonClick = () => {
    const isPlaying = !this.state.isPlaying;
    this.setState({ isPlaying });
  };

  handlePlayerOnPlay = () => {
    this.setState({ isPlaying: true });
  };

  handlePlayerOnPause = () => {
    this.setState({ isPlaying: false });
  };

  getSortedSongs = () => {
    const { songs, sortColumn, searchQuery } = this.state;

    let filteredSongs = songs;
    if (searchQuery) {
      filteredSongs = songs.filter(song =>
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
                id={selectedSong.host_id}
                host={selectedSong.host}
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
