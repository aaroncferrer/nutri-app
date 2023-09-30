import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
	const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

	const [eventTypes, setEventTypes] = useState([]);

	const signInCallback = (result) => {
		if (result.credential) {
			const params = { token: result.credential };
			axios
			.post('http://localhost:3000/patient/google', params)
			.then((res) => {
				console.log(res.data);
				// set token in local storage
				// redirect to /dashboard
			})
			.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		const fetchEventTypes = async () => {
		try {
			const response = await axios.get('http://localhost:3000/get_user_event_types');
			setEventTypes(response.data.collection);
			console.log(response.data.collection)
			console.log(eventTypes)
		} catch (error) {
			console.error('Error fetching event types:', error);
		}
		};

		fetchEventTypes();
	}, []); // Empty dependency array to run the effect only once

	useEffect(() => {
    	/* global google */
		google.accounts.id.initialize({
			client_id:
				googleClientId,
			callback: signInCallback,
			cancel_on_tap_outside: false,
		});

		google.accounts.id.renderButton(document.getElementById("signInDiv"), {
			theme: "outline",
			size: "large",
		});

		google.accounts.id.prompt();
  	}, []);

	return (
		<div className="App">
			<div id="signInDiv" />
			<p>Select a scheduling link:</p>
			<ul>
				{eventTypes.map((eventType) => (
				<li key={eventType.uri}>
					<a href={eventType.scheduling_url} target="_blank" rel="noopener noreferrer">
					{eventType.name}
					</a>
				</li>
				))}
			</ul>
		</div>
	)
}

export default App
