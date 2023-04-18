import React, { useEffect, useState } from "react";
import TeamPic from "./img/team_silhoutte.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import "./css/teamdata.css"

const TeamData = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [tName, settName] = useState("");
  const [number, setNumber] = useState("");
  const [TeamNameChange, setTeamNameChange] = useState("");
  const [tID, settID] = useState("");

  const handleGetSubmit = (event) => {
    event.preventDefault();
    var display = '';
    const database = document.getElementById('database');
    //If input field is empty
    if (number === "") {
        fetch("/node/db")
        .then((response) => response.json())
        .then((data) => {
          let count = 0;
          let teamData = [];
      
          data.forEach((doc) => {
            if (doc.parameters && doc.parameters.team && doc.response[0]) {
              count++;
              let teamId = doc.response[0].team.id;
              let teamName = doc.response[0].team.name;
              let teamLogo = doc.response[0].team.logo;
              teamData.push({ id: teamId, name: teamName, logo: teamLogo });
            }
          });
      
          let table = '<table class="center">';
          teamData.forEach((team, index) => {
            if (index % 3 == 0) {
              table += '<tr>';
            }
            table += `<td><img src="${team.logo}" alt="${team.name} logo" height="30px"></td><td>${team.name} (${team.id})</td>`;
            if (index % 3 == 2 || index == teamData.length - 1) {
              table += '</tr>';
            }
          });
          table += '</table>';
      
          let display = `<div class="center">Number of Valid Documents are ${count}. Here is a list of teams:<br>${table}</div>`;
          console.log(display);
          $(database).html(display);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else { //If input is not empty
        fetch(`/node/db/${number}`)
        .then((response) => response.json())
        .then((data) => {
            const teamName = data.response[0].team.name;
            const teamLogo = data.response[0].team.logo;
            const players = data.response[0].players;
            let display = `<div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6 team-info">
                        <h3>Team Information</h3>
                    </div>
                    <div class="col-md-6 player-info">
                        <h3 class="float-md-right">Player Information</h3>
                    </div>
                </div>      
                <hr>
                </div>
                <div class="col-md-6">
                <div class="card team-card">
                    <div class="card-body">
                    <img src="${teamLogo}" id="team-logo" class="card-img-top team-logo">
                    <h5 class="card-title" id="team-name">${teamName}</h5>
                    </div>
                </div>
                </div>
                <div class="col-md-6">
                <div class="row">
                    ${players.map(player => {
                    const playerName = player.name;
                    const playerAge = player.age;
                    const playerPosition = player.position;
                    const playerPhoto = player.photo;
                    return `
                        <div class="col-md-4">
                        <div class="card player-card">
                            <img src="${playerPhoto}" class="card-img-top player-photo">
                            <div class="card-body">
                            <h5 class="card-title">${playerName}</h5>
                            <p class="card-text">Age: ${playerAge}</p>
                            <p class="card-text">Position: ${playerPosition}</p>
                            </div>
                        </div>
                        </div>
                    `;
                    }).join('')}
                </div>
                </div>
            </div>
            </div>`;
            $(database).html(display);
        })
        .catch((error) => {
            alert(`Please Make Sure ${number} is a number and there is matching data:`, error);
        });
    }
  setNumber("");
  };

const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    var display = '';
    const database = document.getElementById('database');
    if (number.trim() === '') {
        // Delete all teams from database
        try {
          await fetch('/node/db', {
            method: 'DELETE'
          });
          display = `<div class="center">All teams deleted from database</div>`;
          $(database).html(display);
        } catch (err) {
          console.error(err);
        }
      } else {
        // Delete the team with corresponding id and number
        try {
          const response = await fetch(`/node/db/${number}`, {
            method: 'DELETE'
          });
          const data = await response.json();
          display = `<div class="center">Tean ID ${number} has been deleted from database</div>`;
          $(database).html(display);
          console.log(data.message);
        } catch (err) {
          console.error(err);
        }
      }
    setNumber("");
  };
  
const handleReset = async (event) => {
    event.preventDefault();
    var display = '';
    const database = document.getElementById('database');
    try {
        const response = await fetch('/node/db/reset', {
        method: 'POST'
        });
        const data = await response.json();
        console.log(data.message);
        display = `<div class="center">Database has been reset</div>`;
        $(database).html(display);
    } catch (err) {
        console.error(err);
    }
    // Handle reset logic here
}
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const database = document.getElementById('database');
    //first count the datase and figure out the id for this new doc
    const check = await fetch("/node/db");
    const check_data = await check.json();
    let highest_team_id = 0;
    check_data.forEach(doc => {
    if (doc.response[0].team.id > highest_team_id) {
      highest_team_id = doc.response[0].team.id;
    } 
    });
    console.log(`Highest team id: ${highest_team_id}`);

    //update a new doc
    highest_team_id++;
    const response = await fetch("/node/newDoc.json");
    const data = await response.json();
    data.parameters.team = highest_team_id.toString();
    data.response[0].team.id = highest_team_id;
    data.response[0].team.name = tName;
    await fetch("/node/newDoc.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //upload this json file to the database 
    await fetch("/node/db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let display = `<div class="center">New document have been added to the DB!<br>New team's ID is ${highest_team_id} and the name is ${tName}</div>`;
  $(database).html(display);
  settName=("");
  }

  const handlePutSubmit = async (event) => {
    event.preventDefault();
    const database = document.getElementById('database');
    const newTeamName = TeamNameChange.trim();
    if (newTeamName.length === 0) {
      alert("Please enter a new team name.");
      return;
    }
  
    const tId = tID.trim();
  
    if (tId.length === 0) {
      // If tID is blank, update the entire database
      const url = "/node/db";
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTeamName }),
      });
      const data = await response.json();
      console.log(data);
      let display = `<div class="center">Entire database names have been updated to ${newTeamName}</div>`;
      $(database).html(display);
    } else {
      // If tID is not blank, update the team with the corresponding ID
      const url = `/node/db/${tId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTeamName }),
      });
      const data = await response.json();
      let display = `<div class="center">Team ID ${tID}'s name has been updated to ${newTeamName} <br> Type ${tID} and Press GET button to see the change!</div>`;
      $(database).html(display);
    }
    // Reset the form
    settID("");
    setTeamNameChange("");
  };
  
  const handleteamChange = (event) => {
    settName(event.target.value);
  }
  const handleInputChange = (event) => {
    setNumber(event.target.value);
  }
  const handtIDChange = (event) => {
    settID(event.target.value);
  }
  const handleTeamNameChangeChange = (event) => {
    setTeamNameChange(event.target.value);
  }

    return (
        <>
            <div className="team_background">
                <div className="container d-flex align-items-center flex-column my-5 py-5 text-center">
                    <img className="mb-5" src={TeamPic} alt="https://www.pngkey.com/detail/u2w7q8a9y3o0u2a9_info-soccer-team-black-and-white/#google_vignette" data-aos="zoom-in" data-aos-delay="300" />
                    <div className="row g-3 justify-content-center" data-aos="zoom-in" data-aos-delay="600">
                      <div className="col-auto">
                        <form>
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="number">DB Number:</label>
                                <input type="text" className="form-control" name="number" id="number" value={number} onChange={handleInputChange} />
                                <button type="submit" className="btn btn-primary" onClick={handleGetSubmit}>GET</button>
                                <button type="submit" className="btn btn-danger" onClick={handleDeleteSubmit}>DELETE</button>
                            </div>
                        </form>
                      </div>
                        <div className="col-auto">
                            <form>
                                <div className="input-group">
                                    <label className="input-group-text" htmlFor="tName">TeamName:</label>
                                    <input type="text" className="form-control" name="tName" id="tName" value={tName} onChange={handleteamChange}/>
                                    <button type="submit" className="btn btn-success" onClick={handlePostSubmit}>POST</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-auto">
                            <form>
                                <div className="input-group">
                                    <label className="input-group-text" htmlFor="tID">TeamID:</label>
                                    <input type="text" className="form-control" name="tID" id="tID" value={tID} onChange={handtIDChange}/>
                                    <label className="input-group-text" htmlFor="TeamNameChange">TeamNameChange:</label>
                                    <input type="text" className="form-control" name="TeamNameChange" id="TeamNameChange" value={TeamNameChange} onChange={handleTeamNameChangeChange}/>
                                    <button type="submit" className="btn btn-warning" onClick={handlePutSubmit}>PUT</button>
                                </div>
                            </form>
                        </div>
                      <div className="col-auto justify-center">
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>RESET</button>
                      </div>
                    </div>
                </div>
                <div className="container" id="database"></div>
            </div>
        </>
    );
}

export default TeamData;
