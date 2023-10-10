import { useEffect, useState } from "react";

// File Imports
import Landing from "./pages/Landing";
import NavHeader from "./components/NavHeader";

// Library/Packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Services from "./pages/Services";

function App() {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null)

	useEffect(() => {
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
	}, [currentUser])

	useEffect(() => {
		AOS.init({duration: 1000, anchorPlacement: 'center-bottom'})
	}, [])


	return (
		<Router>	
			<NavHeader 
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
			/>
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/auth" element={<Auth setCurrentUser={setCurrentUser}/>} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/services" element={<Services currentUser={currentUser} />} />
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
