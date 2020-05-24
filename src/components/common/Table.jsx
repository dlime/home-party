import React from "react";
import PropTypes from "prop-types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ data, columns, onItemClick }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} onItemClick={onItemClick} />
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default Table;
