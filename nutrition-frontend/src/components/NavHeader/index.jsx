import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'
import logo from '../../assets/logo_blue-plain.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavHeader({currentUser, setCurrentUser}) {
  	const navigate = useNavigate();
	const location = useLocation();

	const navigateHome = () => {
    	navigate('/');
  	};

	const handleLogout = () => {
		setCurrentUser(null);
		alert('Logged out successfully!');
		navigate('/auth')
	}

  return (
	<Navbar expand="lg" className="nav">
        <img className='nav_logo' onClick={navigateHome} src={logo}></img>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav_actions">
				<a className='nav_links' onClick={navigateHome} >Home</a>
				{location.pathname === '/' &&(
				<>
					<a className='nav_links' href="#landing_about">About</a>
					<a className='nav_links' href="#landing_services">Services</a>
				</>
					
				)}
				<a className='nav_links' href="#contact">Contact</a>
				{currentUser ? (
					<Link to='/dashboard' className='nav_links'>Dashboard</Link>
				):(
					null
				)}
          </Nav>
			<div className="nav_btn_container">
				{currentUser ? (
					<button className='nav_btn custom_btn' onClick={handleLogout}>Log Out</button>
				):(
					<button className='nav_btn custom_btn' onClick={() =>  navigate('/auth')}>Log In</button>
				)}
			</div>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHeader;