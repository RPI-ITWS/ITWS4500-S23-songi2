  import './css/allLocations.css';
  import { useState, useEffect } from "react";

  const AllLocations = () => {
    const [locations, setLocations] = useState([]);
    const [state, setState] = useState('New York');
    const [category, setCategory] = useState('air_temp');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (page) => {
      const response = await fetch(`/data/${state}/${category}/${sortOrder}?page=${page}&limit=10`);
      const data = await response.json();
      setLocations(data);
    };
    

    useEffect(() => { 
      fetchData(currentPage);
    }, [currentPage]);
    

    const handleStateChange = (event) => {
      setState(event.target.value);
    };

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const handleSortOrderChange = (event) => {
      setSortOrder(event.target.value);
    };

    const handleFetchData = () => {
      fetchData();
    };

    return (
      <div className='allLocations' id="all">
        <br />
        <h4>All Locations Comparison Table</h4>
        <div className="container my-container rounded my-5 py-5">
          <div className="row bg-transparent">
            <div className="col-md-10">
              <table>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Air Temperature (K)</th>
                  <th>Wind Speed (m/s) </th>
                  <th>Wind Stress (N/m2)</th>
                </tr>
              </thead>
              <tbody>
              {locations.length > 0 && locations.slice((currentPage - 1) * 10, currentPage * 10).map(location => (
                <tr key={location._id}>
                  <td>{location.city_name}</td>
                  <td>{location.air_temp}</td>
                  <td>{location.windspeed}</td>
                  <td>{location.stress}</td>
                </tr>
              ))}
            </tbody>
            </table>
            <div className="pagination d-flex justify-content-center my-3">
              <button
                className="btn btn-primary mr-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="page-number mx-2">{currentPage}</span>
              <button
                className="btn btn-primary ml-2"
                disabled={locations.length < 10 || currentPage === 5}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
            
            </div>
            <div className='col-md-2 input-fields'>
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="state">Select a state:</label>
                      <select className="form-control" id="state" onChange={handleStateChange} value={state}>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New York">New York</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Vermont">Vermont</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="Maine">Maine</option>
                        <option value="Quebec">Quebec</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="category">Select a category:</label>
                      <select className="form-control" id="category" onChange={handleCategoryChange} value={category}>
                        <option value="air_temp">Air Temperature</option>
                        <option value="windspeed">Wind Speed</option>
                        <option value="stress">Wind Stress</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="sortOrder">Select a sort order:</label>
                      <select className="form-control" id="sortOrder" onChange={handleSortOrderChange} value={sortOrder}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              <button className="btn btn-primary" onClick={handleFetchData}>Get Data</button>
            </div>
          </div>
        </div>
        <div className="end"></div>
      </div>
    );
  };

  export default AllLocations;
