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
// import axios from 'axios';

function App() {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null)

	useEffect(() => {
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
	}, [currentUser])

	useEffect(() => {
		AOS.init({duration: 1000, anchorPlacement: 'center-bottom'})
	}, [])
	// const [eventTypes, setEventTypes] = useState([]);

	// useEffect(() => {
	// 	const fetchEventTypes = async () => {
	// 	try {
	// 		const response = await axios.get('http://localhost:3000/get_user_event_types');
	// 		setEventTypes(response.data.collection);
	// 		console.log(response.data.collection)
	// 	} catch (error) {
	// 		console.error('Error fetching event types:', error);
	// 	}
	// 	};
	// 	fetchEventTypes();
	// }, []); 

	return (
		// <>
		// 	<p>Select a scheduling link:</p>
		// 	<ul>
		// 		{eventTypes.map((eventType) => (
		// 		<li key={eventType.uri}>
		// 			<a href={eventType.scheduling_url} target="_blank" rel="noopener noreferrer">
		// 			{eventType.name}
		// 			</a>
		// 		</li>
		// 		))}
		// 	</ul>
		// </>
		<Router>	
			<NavHeader />
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/auth" element={<Auth />} />
			</Routes>
		</Router>
	)
}

export default App
