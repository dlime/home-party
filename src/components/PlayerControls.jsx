import React from "react";
// import PropTypes from "prop-types";

// PlayerControls.propTypes = {};

function PlayerControls(props) {
  return (
    <footer className="py-4 bg-light">
      <div className="container text-center">
        <button className="btn btn-primary btn-circle btn-circle-xl m-1">
          <i className="fas fa-play" />
        </button>
      </div>
    </footer>
  );
}

export default PlayerControls;
