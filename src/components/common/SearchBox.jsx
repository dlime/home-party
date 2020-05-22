import React from "react";
import PropTypes from "prop-types";

const onKeyPress = (event, onSubmit) => {
  const searchValue = event.currentTarget.value.trim();
  if (event.key === "Enter" && searchValue) {
    onSubmit(searchValue);
    event.currentTarget.value = "";
  }
};

function SearchBox({ onSubmit }) {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      onKeyPress={(e) => onKeyPress(e, onSubmit)}
    />
  );
}

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBox;
