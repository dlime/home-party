import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./common/Table";
import { getTokenFromLocalStorage, getAuthorizationUrl } from "./spotify/Utils";
import Alert from "./common/Alert";

class SearchResultsTable extends Component {
  state = {
    showAlert: true,
  };

  columns = [
    {
      path: "name",
      label: "Title",
      content: (song) => {
        return song.artist + " - " + song.name;
      },
    },
    { path: "host", label: "Site" },
    {
      path: "add-song",
      content: (song) => {
        return (
          <i
            className="fas fa-plus-circle fa-lg"
            style={{ color: "green" }}
            onClick={(event) => {
              this.props.onAddSong(song);
              event.stopPropagation();
            }}
          ></i>
        );
      },
    },
  ];

  handleAlertClick = () => {
    this.setState({ showAlert: false });
  };

  loginToSpotifyText = (
    <React.Fragment>
      To search songs in Spotify
      <a className="btn-spotify-small" href={getAuthorizationUrl()}>
        Login
      </a>
    </React.Fragment>
  );

  render() {
    const { data, onAddSong } = this.props;
    const { showAlert } = this.state;
    const spotifyToken = getTokenFromLocalStorage();
    return (
      <React.Fragment>
        {!spotifyToken && showAlert && (
          <Alert
            text={this.loginToSpotifyText}
            onClick={this.handleAlertClick}
          />
        )}
        <Table
          data={data}
          columns={this.columns}
          onItemClick={onAddSong}
          selectedSong="none"
        />
      </React.Fragment>
    );
  }
}

SearchResultsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onAddSong: PropTypes.func.isRequired,
};

export default SearchResultsTable;
