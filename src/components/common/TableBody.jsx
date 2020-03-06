import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const renderCell = (item, column) => {
  if (column.content) {
    return column.content(item);
  }

  return _.get(item, column.path);
};

const createKey = (item, column, dataKey) => {
  return item[dataKey] + (column.path || column.label);
};

const TableBody = ({ data, dataKey, columns }) => {
  return (
    <tbody>
      {data.map(item => (
        <tr key={item[dataKey]}>
          {columns.map(column => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  dataKey: "_id"
};

TableBody.propTypes = {
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired, // todo: check array elements structure
  columns: PropTypes.array.isRequired // todo: check array elements structure
};

export default TableBody;
