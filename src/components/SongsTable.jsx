import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./common/Table";

class SongsTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "duration", label: "Duration" },
    { path: "api", label: "Site" },
    {
      path: "delete",
      content: song => {
        return (
          <button
            onClick={() => this.props.onDelete(song._id)}
            className="btn btn-danger btn-s"
          >
            Delete
          </button>
        );
      }
    }
  ];

  render() {
    const { data, onDelete, onSort, sortColumn } = this.props;

    return (
      <Table
        data={data}
        columns={this.columns}
        sortColumn={sortColumn}
        onDelete={onDelete}
        onSort={onSort}
      />
    );
  }
}

SongsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired
};

export default SongsTable;
