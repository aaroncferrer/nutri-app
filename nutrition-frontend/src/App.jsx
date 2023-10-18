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
import Dashboard from "./pages/Dashboard";
import { ApiProvider } from "./ApiContext";

function App() {
	const apiUrl = import.meta.env.VITE_REACT_APP_API_URL; 

	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null)
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
	}, [currentUser])

	useEffect(() => {
		AOS.init({duration: 1000, anchorPlacement: 'center-bottom'})
	}, [])


	return (
		<ApiProvider apiUrl={apiUrl}>
		<Router>	
			<NavHeader 
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
			/>
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/auth" element={<Auth 
					setCurrentUser={setCurrentUser}
					loading={loading}
					setLoading={setLoading}
				/>} />
				<Route exact path="/signup" element={<Signup 
					setCurrentUser={setCurrentUser}
					loading={loading}
					setLoading={setLoading}
				/>} />
				<Route exact path="/services" element={<Services currentUser={currentUser} />} />
				<Route exact path="/dashboard" element={<Dashboard 
					currentUser={currentUser} 
					setCurrentUser={setCurrentUser} 
					loading={loading}
					setLoading={setLoading}
				/>} />
			</Routes>
			<Footer />
		</Router>
		</ApiProvider>
	)
}

export default App
