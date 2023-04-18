import React, { useState, useEffect } from "react";
import BettingImg from "./img/bettings.png"
import "./css/betting.css"

function BettingTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/node/betting")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="team_background">
      <div className="container d-flex align-items-center flex-column my-5 py-5 text-center">
      <img className="mb-5" src={`${process.env.PUBLIC_URL}/node/static/media/bettings.544937fcbb216e9a3297.png`} alt="https://www.pngkey.com/detail/u2w7q8a9y3o0u2a9_info-soccer-team-black-and-white/#google_vignette" />
        <table className="table my-5">
          <thead>
            <tr>
              <th>Sport Title</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Bookmaker</th>
              <th>Home</th>
              <th>Away</th>
              <th>Draw</th>
              <th>Bookmaker</th>
              <th>Home</th>
              <th>Away</th>
              <th>Draw</th>
              <th>Bookmaker</th>
              <th>Home</th>
              <th>Away</th>
              <th>Draw</th>
            </tr>
          </thead>
          <tbody>
            {data.map((match) => (
              <tr key={match.id}>
                <td>{match.sport_title}</td>
                <td>{match.home_team}</td>
                <td>{match.away_team}</td>
                {match.bookmakers.slice(0, 3).map((bookmaker) => (
                  <React.Fragment key={bookmaker.key}>
                    <td>{bookmaker.title}</td>
                    <td>
                      {bookmaker.markets.length > 0 &&
                        bookmaker.markets[0].outcomes.length > 0 &&
                        bookmaker.markets[0].outcomes[0].price}
                    </td>
                    <td>
                      {bookmaker.markets.length > 0 &&
                        bookmaker.markets[0].outcomes.length > 1 &&
                        bookmaker.markets[0].outcomes[1].price}
                    </td>
                    <td>
                      {bookmaker.markets.length > 0 &&
                        bookmaker.markets[0].outcomes.length > 2 &&
                        bookmaker.markets[0].outcomes[2].price}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BettingTable;
