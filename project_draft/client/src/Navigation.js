import { NavLink} from 'react-router-dom';
import { NavItem} from 'react-bootstrap';


const Navigation = () => (
    <nav className="navbar navbar-expand-sm navbar-light bg-light border-bottom border-secondary border-2" id="navbar">
    <NavItem className="navbar-brand weight-700" href="#" >Windvision</NavItem>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className=" navbar-nav collapse navbar-collapse" id="navbarNavAltMarkup">
      
        <NavLink className="nav-item nav-link weight-700" exact activeclassname="current" to='/node/'>Home</NavLink>
        <NavLink className="nav-item nav-link weight-700" exact activeclassname="current" to='/node/allLocations'>All Locations</NavLink>
        <NavLink className="nav-item nav-link weight-700" exact activeclassname="current" to='/node/locationSearch'>Location Search</NavLink>
        <NavLink className="nav-item nav-link weight-700" exact activeclassname="current" to='/nodemodeling'>Modeling</NavLink>
        <NavLink className="nav-item nav-link weight-700" exact activeclassname="current" to='/node/about'>About</NavLink>
        <NavLink className="nav-item nav-link weight-700" exact activeclassname="current" to='/node/feedback'>Contact Us</NavLink>

      </div>
    </div>
</nav>
  );

export default Navigation;