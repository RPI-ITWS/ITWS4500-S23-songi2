import React from "react";
import TeamPic from "./img/team_silhoutte.png"


const TeamData = () => {
    const handleGetDeleteSubmit = (event) => {
        event.preventDefault();
        // Handle GET or DELETE request here
      }
    
      const handlePostPutSubmit = (event) => {
        event.preventDefault();
        // Handle POST or PUT request here
      }
    
      const handleReset = (event) => {
        event.preventDefault();
        // Handle reset logic here
      }
    
      return (
        <><div className="team_background">
            <div className="container d-flex align-items-center flex-column my-5 py-5">
            <img
              className="mb-5"
              src={TeamPic}
              alt="https://www.pngkey.com/detail/u2w7q8a9y3o0u2a9_info-soccer-team-black-and-white/#google_vignette" />
              <div className="row g-3">
                  <div className="col-auto">
                      <form onSubmit={handleGetDeleteSubmit}>
                          <div className="input-group">
                              <label className="input-group-text" htmlFor="name">Name:</label>
                              <input type="text" className="form-control" name="name" id="name" />
                              <button type="submit" className="btn btn-primary">GET</button>
                              <button type="submit" className="btn btn-danger">DELETE</button>
                          </div>
                      </form>
                  </div>

                  <div className="col-auto">
                      <button type="button" className="btn btn-secondary" onClick={handleReset}>RESET</button>
                  </div>    

                  <div className="col-auto">
                      <form onSubmit={handlePostPutSubmit}>
                          <div className="input-group">
                              <label className="input-group-text" htmlFor="name">Name:</label>
                              <input type="text" className="form-control" name="name" id="name" />
                              <label className="input-group-text" htmlFor="age">Age:</label>
                              <input type="number" className="form-control" name="age" id="age" />
                              <button type="submit" className="btn btn-success">POST</button>
                              <button type="submit" className="btn btn-warning">PUT</button>
                          </div>
                      </form>
                  </div>
              </div>
            </div>
        </div></>
      );
}

export default TeamData
