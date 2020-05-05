import React from "react";
import PropTypes from "prop-types";

function PlayerControls(props) {
  const { isPlaying, onPlayClick, onPreviousClick, onNextClick } = props;

  return (
    <footer className="py-4 bg-light">
      <div className="container text-center">
        <button
          className="btn btn-primary btn-circle-l m-1"
          onClick={() => onPreviousClick()}
        >
          <i className={"fas fa-backward"} />
        </button>
        <button
          className="btn btn-primary btn-circle btn-circle-xl m-1"
          onClick={() => onPlayClick()}
        >
          <i className={isPlaying ? "fas fa-pause" : "fas fa-play"} />
        </button>
        <button
          className="btn btn-primary btn-circle-l m-1"
          onClick={() => onNextClick()}
        >
          <i className={"fas fa-forward"} />
        </button>
      </div>
    </footer>
  );
}

PlayerControls.propTypes = {
  onPlayClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default PlayerControls;
