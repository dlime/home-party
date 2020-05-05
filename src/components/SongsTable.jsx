import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./common/Table";

class SongsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (song) => {
        return (
          <button
            className="btn bg-transparent"
            onClick={() => this.props.onSongClick(song)}
          >
            {song.name}
          </button>
        );
      },
    },
    { path: "duration", label: "Duration" },
    { path: "host", label: "Site" },
    {
      path: "delete",
      content: (song) => {
        return (
          <button
            onClick={(event) => {
              this.props.onDelete(song._id);
              event.stopPropagation();
            }}
            className="btn btn-danger btn-s"
          >
            Delete
          </button>
        );
      },
    },
  ];

  render() {
    const { data, onSort, onSongClick, sortColumn } = this.props;

    return (
      <Table
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
};

export default SongsTable;
