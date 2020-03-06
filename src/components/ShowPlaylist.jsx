import React, { Component } from "react";
import SearchBox from "./common/SearchBox";
import SongsTable from "./SongsTable";
import { getSongs } from "../services/fakePlaylistService";
import _ from "lodash";

class ShowPlaylist extends Component {
  state = {
    songs: [],
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  componentDidMount() {
    const songs = getSongs();
    this.setState({ songs });
  }

  handleDeleteButton = async id => {
    const { songs } = this.state;
    const originalSongs = songs;

    const newSongs = originalSongs.filter(song => {
      return song._id !== id;
    });

    this.setState({ songs: newSongs });
  };

  handleSortClick = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  getSortedSongs = () => {
    const { songs, sortColumn, searchQuery } = this.state;

    let filteredSongs = songs;
    if (searchQuery) {
      filteredSongs = songs.filter(
        song => song.name.toLowerCase().startsWith(searchQuery.toLowerCase()) //TODO: improve search method
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
    const { searchQuery, sortColumn } = this.state;

    return (
      <div className="row">
        <div className="col"></div>

        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <SongsTable
            data={this.getSortedSongs()}
            sortColumn={sortColumn}
            onDelete={this.handleDeleteButton}
            onSort={this.handleSortClick}
          />
        </div>
      </div>
    );
  }
}

export default ShowPlaylist;
