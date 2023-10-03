import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'
import logo from '../../assets/logo_blue-plain.png';

function NavHeader() {
  return (
	<Navbar expand="lg" className="nav" fixed="top">
        <img className='nav_logo' src={logo}></img>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav_actions">
				<a className='nav_links' href="#landing_hero">Home</a>
				<a className='nav_links' href="#landing_about">About</a>
				<a className='nav_links' href="#landing_services">Services</a>
				<a className='nav_links' href="#landing_contact">Contact</a>
          </Nav>
			<div className="nav_btn_container">
				<button className='nav_btn'>Log In</button>
			</div>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHeader;