import React from "react";
import Chart from './components/BarChart.js';
import './css/search.css';


export default function LocationSearch (){
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [state1, setState1] = React.useState("Select State");
  const [state2, setState2] = React.useState("Select State");

  const handleState1Change = (event) => {
    setState1(event.target.value);
    forceUpdate();
  };

  const handleState2Change = (event) => {
    setState2(event.target.value);
    forceUpdate();
  };

    return(
    <div>
      <br></br>
      <div className='locationSearch' id="items">
        <h4>Location Comparison Tool</h4><br></br>
        <div className="row justify-content-center align-items-center">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="label" htmlFor="state">Select first location:</label>
                <select className="form-control border border-secondary" id="state" onChange={handleState1Change} value={state1}>
                  <option value="Select State">-Select Location-</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Maine">Maine</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New York">New York</option>
                  <option value="Ontario">Ontario</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Rhode Island">Rhode Island</option>
                  <option value="Vermont">Vermont</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="label" htmlFor="state">Select second location:</label>
                <select className="form-control border border-secondary" id="state" onChange={handleState2Change} value={state2}>
                  <option value="Select State">-Select Location-</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Maine">Maine</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New York">New York</option>
                  <option value="Ontario">Ontario</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Rhode Island">Rhode Island</option>
                  <option value="Vermont">Vermont</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="output"><Chart states={{first : state1, second : state2}}/></div>
        <br></br>
        <p>Our average data is calculated by collecting the sums of wind speed, temperature, and stress<br></br> from every location and dividing
        each by the total number of locations.
        </p>
        <p className="end"></p>
      </div>
    </div>
    );
}