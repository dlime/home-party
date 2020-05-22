import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./common/Table";

class SearchResultsTable extends Component {
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
            className="fas fa-trash"
            onClick={(event) => {
              this.props.onAddSong(song);
              event.stopPropagation();
            }}
          ></i>
        );
      },
    },
  ];

  render() {
    const { data, onAddSong } = this.props;

    return (
      <Table
        data={data}
        columns={this.columns}
        onItemClick={onAddSong}
        selectedSong="none"
      />
    );
  }
}

SearchResultsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onAddSong: PropTypes.func.isRequired,
};

export default SearchResultsTable;
