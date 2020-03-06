import React from "react";
import PropTypes from "prop-types";

function PlayerControls(props) {
  const { isPlaying, onPlayClick } = props;

  return (
    <footer className="py-4 bg-light">
      <div className="container text-center">
        {/* 
        <PreviousSongButton />
        <PlaySongButton />
        <NextSongButton />
        */}

        <button
          className="btn btn-primary btn-circle btn-circle-xl m-1"
          onClick={() => onPlayClick()}
        >
          <i className={isPlaying ? "fas fa-pause" : "fas fa-play"} />
        </button>
      </div>
    </footer>
  );
}

PlayerControls.propTypes = {
  onPlayClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default PlayerControls;
