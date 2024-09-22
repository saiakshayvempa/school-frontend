import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'

// import NavBarMenu from "./NavBarMenu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faRightToBracket,faRightFromBracket,faDoorOpen } from '@fortawesome/free-solid-svg-icons'

class NavBarMenu extends Component {

  render() {
    return (
      <div>
        <Navbar style={{ height: "10vh" }} expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#home">School</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto w-100">
                <Nav.Link  href="#home"><Link className='nav-link' to="/"><FontAwesomeIcon icon={faHome} color="Black" />Home</Link></Nav.Link>
                <Nav.Link ><Link className='nav-link' to="/aboutus"><FontAwesomeIcon icon={faDoorOpen} color="Black" />AboutUs</Link></Nav.Link>
                <Nav.Link ><Link className='nav-link' to="/contactus"><FontAwesomeIcon icon={faDoorOpen} color="Black" />contactus</Link></Nav.Link>
                <Nav.Link ><Link className='nav-link' to="/admissions"><FontAwesomeIcon icon={faDoorOpen} color="Black" />Admissions</Link></Nav.Link>
                
                {
                  localStorage.getItem('login') ?
                    <Nav.Link style={{marginLeft:'auto'}}href="#logout"><Link className='nav-link' to="/logout"><FontAwesomeIcon icon={faRightFromBracket} color="Black" />Logout</Link></Nav.Link>
                    :
                    <Nav.Link style={{marginLeft:'auto'}}href="#login"><Link className='nav-link' to="/login"><FontAwesomeIcon icon={faRightToBracket} color="Black" />Login</Link></Nav.Link>

                }


              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>

    );
  }
}

export default NavBarMenu;