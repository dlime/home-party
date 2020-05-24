import React from "react";
import PropTypes from "prop-types";

const Alert = ({ text, onClick }) => {
  return (
    <div className="alert alert-light alert-dismissible" role="alert">
      {text}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClick}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Alert;
