import { useEffect } from "react";
import axios from 'axios';

function App() {
	const signInCallback = (result) => {
		if (result.credential) {
			const params = { token: result.credential };
			axios
			.post("http://localhost:3000/user/google", params)
			.then((res) => {
				console.log(res.data);
				// set token in local storage/cookies based on your authentication method
				// redirect to the authenticated page
			})
			.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
    	/* global google */
		google.accounts.id.initialize({
			client_id:
				"1097164830695-qu5q175nq3r8bc5qvgo180n3lkvt1p8o.apps.googleusercontent.com",
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
		</div>
	)
}

export default App
