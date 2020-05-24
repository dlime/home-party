import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchInput extends Component {
  state = {
    value: "",
  };

  onKeyPress = (key) => {
    if (key === "Enter") {
      this.submitSearch();
    }
  };

  onChange = (value) => {
    this.setState({ value });
  };

  submitSearch = () => {
    const { onSubmit } = this.props;
    const { value } = this.state;
    const searchValue = value.trim();
    if (searchValue) {
      onSubmit(searchValue);
      this.setState({ value: "" });
    }
  };

  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <input
          type="text"
          name="query"
          className="form-control my-3"
          placeholder="Search..."
          value={value}
          onKeyPress={(e) => this.onKeyPress(e.key)}
          onChange={(e) => this.onChange(e.currentTarget.value)}
        />

        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary my-3"
            style={{
              width: "58px",
            }}
            type="button"
            onClick={() => this.submitSearch()}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
