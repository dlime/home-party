import React from "react";
import PropTypes from "prop-types";

PlayerControls.propTypes = {};

function PlayerControls(props) {
  return (
    <footer className="py-4 bg-dark">
      <div className="container text-center">
        <i className="fas fa-play" /> <i className="fas fa-angle-double-down" />
      </div>
    </footer>
  );
}

export default PlayerControls;
