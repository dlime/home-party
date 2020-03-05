import React from "react";
import PropTypes from "prop-types";

function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
}

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBox;
