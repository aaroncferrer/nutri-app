import { useEffect, useState } from "react";
import axios from 'axios';
import GoogleSignIn from "./components/GoogleSignIn";

function App() {
	const [eventTypes, setEventTypes] = useState([]);

	useEffect(() => {
		const fetchEventTypes = async () => {
		try {
			const response = await axios.get('http://localhost:3000/get_user_event_types');
			setEventTypes(response.data.collection);
			console.log(response.data.collection)
		} catch (error) {
			console.error('Error fetching event types:', error);
		}
		};
		fetchEventTypes();
	}, []); 

	return (
		<div className="App">
			<GoogleSignIn />
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
