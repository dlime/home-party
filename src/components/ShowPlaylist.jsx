import React, { Component } from "react";
import SearchBox from "./common/SearchBox";
import SongsTable from "./SongsTable";
import { getSongs } from "../services/fakePlaylistService";
import _ from "lodash";
import Player from "./Player";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import SearchResultsTable from "./SearchResultsTable";
import youtubeService from "../services/youtubeService";

class ShowPlaylist extends Component {
  state = {
    searchResults: null,
    sortColumn: { path: "name", order: "asc" },
    songs: [],
    selectedSong: { hostId: "", host: "" },
    isPlaying: false,
    progressValue: 0,
    duration: 0,
    seekTo: 0,
  };

  componentDidMount() {
    const songs = getSongs();
    this.setState({ songs });
    this.manageSpotifyLoginRedirect(songs);
  }

  manageSpotifyLoginRedirect = (songs) => {
    const selectedSong = this.getSelectedSongBeforeRedirect(songs);
    const isPlaying = this.getIsPlayingBeforeRedirect();
    this.selectSong(selectedSong);
    this.setState({ isPlaying });
  };

  getSelectedSongBeforeRedirect = (songs) => {
    const selectedSong = this.readAndRemoveFromLocalStorage("selectedSong");
    if (!selectedSong || !selectedSong.hostId) {
      return songs.length > 0 ? songs[0] : null;
    }

    return songs.find((song) => song.hostId === selectedSong.hostId);
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

  // TODO: ugly stuff, this is to reset progress slide every time a song is changed
  // since there will be a load time between next song will updated it
  selectSong = (selectedSong) => {
    this.setState({ selectedSong, progressValue: 0, duration: 100 });
  };

  getSortedSongs = () => {
    const { songs, sortColumn } = this.state;
    const sortedSongs = _.orderBy(songs, [sortColumn.path], [sortColumn.order]);

    return sortedSongs;
  };

  formatSliderLaber = (progressValue) => {
    const millis = progressValue * 1000;
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  handleDeleteButton = async (id) => {
    const { songs } = this.state;
    const originalSongs = songs;

    const newSongs = originalSongs.filter((song) => {
      return song.hostId !== id;
    });

    this.setState({ songs: newSongs });
  };

  handleSongClick = (selectedSong) => {
    this.selectSong(selectedSong);
  };

  handleSortClick = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchSubmit = async (query) => {
    try {
      const searchResults = await youtubeService.search(query);
      this.setState({ searchResults });
    } catch (error) {
      console.error(error);
    }
  };

  handleAddSong = (song) => {
    const { songs } = this.state;
    const newSongs = songs;
    newSongs.push(song);
    this.setState({ songs: newSongs, searchResults: null });
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
    this.selectSong(sortedSong[previousIndex]);
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
    this.selectSong(sortedSong[nextIndex]);
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

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  // Needed for sync possible slide bar changes in Player (i.e. SoundCloud). Could be removed.
  handleProgress = (progressValue) => {
    this.setState({ progressValue });
  };

  handleSliderChange = (event, progressValue) => {
    if (!this.state.isPlaying) {
      this.handlePlayButtonClick();
    }
    this.setState({ progressValue, seekTo: progressValue });
  };

  render() {
    const {
      sortColumn,
      selectedSong,
      isPlaying,
      duration,
      progressValue,
      seekTo,
      searchResults,
    } = this.state;
    const data = this.getSortedSongs();

    return (
      <React.Fragment>
        <main className="container">
          <div className="row">
            <div className="col-lg">
              <Player
                selectedSong={selectedSong}
                isPlaying={isPlaying}
                seekTo={seekTo}
                onPlay={this.handlePlayerOnPlay}
                onPause={this.handlePlayerOnPause}
                onPlayClick={this.handlePlayButtonClick}
                onEnded={this.handleSongEnded}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
              />
            </div>

            <div className="col-lg">
              <SearchBox onSubmit={this.handleSearchSubmit} />
              {!searchResults && (
                <SongsTable
                  data={data}
                  sortColumn={sortColumn}
                  selectedSong={selectedSong}
                  onSongClick={this.handleSongClick}
                  onDelete={this.handleDeleteButton}
                  onSort={this.handleSortClick}
                />
              )}
              {searchResults && (
                <SearchResultsTable
                  data={searchResults}
                  selectedSong={selectedSong}
                  onAddSong={this.handleAddSong}
                />
              )}
            </div>
          </div>
        </main>
        <footer className="bg-light" style={{ paddingBottom: "20px" }}>
          <ProgressBar
            defaultValue={0}
            min={0}
            max={duration}
            value={progressValue}
            onChange={this.handleSliderChange}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => this.formatSliderLaber(value)}
          />
          <PlayerControls
            isPlaying={isPlaying}
            onPlayClick={this.handlePlayButtonClick}
            onPreviousClick={this.handlePreviousButtonClick}
            onNextClick={this.handleNextButtonClick}
          />
        </footer>
      </React.Fragment>
    );
  }
}

export default ShowPlaylist;
