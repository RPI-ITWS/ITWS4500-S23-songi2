import {Button } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import './css/index.css';

const Home = () => (
    <div className='home'>
        <img src={require('./image/bg.jpg')} alt='windmills' />
        <h1 class="top-middle">Welcome to Windvision</h1>
        <a href="#end"><img src={require('./image/arrow.png')} alt='arrow' id='arrow'/></a>
        <div className="px-4 py-5 my-5 text-center" id="center_text">
            <div id="grey_text">
                <p className="lead mb-4 home-text">Our goal is to show historical wind
                data in many locations in the United States and allow users to find ideal
                locations for new wind turbines. Our "All Locations" page allows users to view data about various locations
                and sort by specific criteria. Our "Location Search" page allows users to select a time range and a location
                to view graphs about historical data.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <NavLink type="button" className="btn btn-dark btn-lg px-4" exact to='/allLocations'>View All Locations</NavLink>
                    <NavLink type="button" className="btn btn-dark btn-lg px-4 gap-3" exact  to='/locationSearch'>Search Locations</NavLink>
                </div>
            </div>
        </div>
        <div id='end'></div>
    </div>
  );



export default Home;