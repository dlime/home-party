import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ data, columns, sortColumn, onSort, onSongClick }) => {
  return (
    <table className="table table-hover">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} onSongClick={onSongClick} />
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onSongClick: PropTypes.func.isRequired,
};

export default Table;
