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

const rowClass = (song, selectedSong) => {
  return "cursor-pointer" + (song === selectedSong ? " table-active" : "");
};

const TableBody = ({ selectedSong, data, dataKey, columns, onSongClick }) => {
  return (
    <tbody>
      {data.map((song) => (
        <tr
          key={song[dataKey]}
          onClick={() => onSongClick(song)}
          className={rowClass(song, selectedSong)}
        >
          {columns.map((column) => (
            <td key={createKey(song, column)}>{renderCell(song, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  dataKey: "_id",
};

TableBody.propTypes = {
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired, // todo: check array elements structure
  columns: PropTypes.array.isRequired, // todo: check array elements structure
  onSongClick: PropTypes.func.isRequired,
  selectedSong: PropTypes.object,
};

export default TableBody;
