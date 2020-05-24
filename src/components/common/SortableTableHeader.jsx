import React from "react";
import PropTypes from "prop-types";

const renderSortIcon = (path, sortColumn) => {
  if (sortColumn.path !== path) {
    return;
  }

  if (sortColumn.order === "desc") {
    return <i className="fas fa-sort-up" />;
  }

  return <i className="fas fa-sort-down" />;
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

const SortableTableHeader = ({ columns, sortColumn, onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
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

SortableTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired, // todo: check that contains order / column
  onSort: PropTypes.func.isRequired,
};

export default SortableTableHeader;
