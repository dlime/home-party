import React from "react";

const WorkInProgress = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2 col-md-offset-5">
          <img
            src={process.env.PUBLIC_URL + "/work_in_progress.jpeg"}
            alt="Work in progress"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
