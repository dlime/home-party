import React from "react";
import PropTypes from "prop-types";

const renderSortIcon = (path, sortColumn) => {
  if (sortColumn.path !== path) {
    return;
  }

  if (sortColumn.order === "desc") {
    return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
  }

  return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
};

const raiseSort = (path, sortColumn, onSort) => {
  if (sortColumn.path === path) {
    if (sortColumn.order === "asc") {
      sortColumn.order = "desc";
    } else {
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  } else {
    onSort({ path, order: "asc" });
  }
};

const TableHeader = ({ columns, sortColumn, onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => {
          return (
            <th
              key={column.path}
              className="clickable"
              onClick={() => raiseSort(column.path, sortColumn, onSort)}
            >
              {column.label}
              {renderSortIcon(column.path, sortColumn)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired, // todo: check that contains order / column
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
