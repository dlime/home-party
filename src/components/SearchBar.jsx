import React from "react";
import SearchInput from "./common/SearchInput";
import PropTypes from "prop-types";

const SearchBar = ({ showBackButton, onSearchSubmit, onSearchGoBack }) => {
  return (
    <div className="input-group mb-3">
      {showBackButton && (
        <div className="input-group-prepend">
          <button
            className="btn btn-primary my-3"
            type="button"
            style={{ width: "86px" }}
            onClick={onSearchGoBack}
          >
            <i
              className="fas fa-angle-left"
              style={{ paddingRight: "12px" }}
            ></i>
            Back
          </button>
        </div>
      )}
      <SearchInput onSubmit={onSearchSubmit} />
    </div>
  );
};

SearchBar.propTypes = {
  showBackButton: PropTypes.bool.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchGoBack: PropTypes.func.isRequired,
};

export default SearchBar;
