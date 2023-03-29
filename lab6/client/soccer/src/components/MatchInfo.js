import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import LeftsideImg from "./img/left-side.png"
import RightsideImg from "./img/right-side.png"
import "./css/matchinfo.css"

const MatchInfo = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  const fetchMatchData = async () => {
    const response = await fetch(`http://localhost:3001/match`);
    const data = await response.json();
    var display = '';
    const database = document.getElementById('database');
    for (let i = 0; i < 4; i++) {
      var keys = Object.keys(data[0])[i];
      display += `<div class="container py-5 my-5 opacity-75 rounded-2" data-aos="zoom-in" style="background-color: #e2725b;">
        <h2 class="text-center mb-4">${keys}</h2>`;
      for (let j = 0; j < 10; j++) {
        const homeLogo = data[0][keys][j]['homeLogo'];
        const homeTeam = data[0][keys][j]['homeTeam'];
        const awayLogo = data[0][keys][j]['awayLogo'];
        const awayTeam = data[0][keys][j]['awayTeam'];
        const homeTeamScore = data[0][keys][j]["homeTeamScore"];
        const awayTeamScore = data[0][keys][j]["awayTeamScore"];
        display += `<div class="row text-center rounded-2" style="background-color: #E1E6E1;">
          <div class="col py-5 text-center">
            <h2>Home Team</h2>
            <img src="${homeLogo}">
            <h4>${homeTeam}</h4>
          </div>
          <div class="col py-5 text-center">
            <h2>Away Team</h2>
            <img src="${awayLogo}">
            <h4>${awayTeam}</h4>
          </div>
          <h4>${homeTeamScore} - ${awayTeamScore}</h4>
          <h5>FT</h5>
        </div>`;
      }
      display += `</div>`;
    }
    $(database).html(display);
  };
  

  return (
    <div className="match-background">
      <div className="container d-flex align-items-center flex-column my-5 py-5">
        <div className="row">
          <div className="container text-center">
            <h1>Welcome to Match History Page!</h1>
          </div>
          <div className="col" data-aos="fade-right" data-aos-delay="400">
            <img
              className="mb-5"
              src={`${process.env.PUBLIC_URL}/node/static/media/left-side.84264797199cceeed914.png`}
              alt="https://www.vecteezy.com/vector-art/7523303-shadow-of-running-football-player"
            />
          </div>
          <div className="col" data-aos="fade-left" data-aos-delay="800">
            <img
              className="mb-5"
              src={`${process.env.PUBLIC_URL}/node/static/media/right-side.9837381aca584a1db5c3.png`}
              alt="https://www.vecteezy.com/vector-art/7523304-black-shadow-of-a-football-player-on-a-white-background"
            />
          </div>
        </div>
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: '#e2725b' }}
          onClick={fetchMatchData}
        >
          Click to get Match Data!
        </button>
        <div className="container" id="database">
        </div>
      </div>
    </div>
  );
}
export default MatchInfo