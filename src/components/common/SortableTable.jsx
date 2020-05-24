import React from "react";
import PropTypes from "prop-types";
import SortableTableHeader from "./SortableTableHeader";
import TableBody from "./TableBody";

const SortableTable = ({
  selectedSong,
  data,
  columns,
  sortColumn,
  onSort,
  onSongClick,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <SortableTableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          selectedSong={selectedSong}
          data={data}
          columns={columns}
          onItemClick={onSongClick}
        />
      </table>
    </div>
  );
};

SortableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSongClick: PropTypes.func.isRequired,
  selectedSong: PropTypes.object.isRequired,
};

export default SortableTable;
