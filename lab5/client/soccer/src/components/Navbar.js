import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigationbar = () => {
  return (
    <Navbar expand="lg" bg='dark' variant='dark' className="text-uppercase fixed-top text-white transparent" id="mainNav">
      <Container>
        <Nav.Link as={NavLink} to="/node/">IT Soccer</Nav.Link>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} className="nav-link py-3 px-0 px-lg-3" to='/node/matchinfo'>Matches History</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link py-3 px-0 px-lg-3" to='/node/teamdata'>Team Data</Nav.Link>
            <Nav.Link as={NavLink} to="/node/" className="nav-link py-3 px-0 px-lg-3">Betting</Nav.Link>
            <Nav.Link as={NavLink} to="/node/" className="nav-link py-3 px-0 px-lg-3">Current News</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
