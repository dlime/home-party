import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./common/Table";

class SongsTable extends Component {
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
      path: "delete",
      content: (song) => {
        return (
          <i
            className="fas fa-trash"
            onClick={(event) => {
              this.props.onDelete(song._id);
              event.stopPropagation();
            }}
          ></i>
        );
      },
    },
  ];

  render() {
    const { data, onSort, onSongClick, sortColumn, selectedSong } = this.props;

    return (
      <Table
        selectedSong={selectedSong}
        data={data}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        onSongClick={onSongClick}
      />
    );
  }
}

SongsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  selectedSong: PropTypes.object.isRequired,
};

export default SongsTable;
