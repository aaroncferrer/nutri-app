import axios from "axios";
import { useEffect } from "react";

function GoogleSignIn() {
    const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

	const signInCallback = async (result) => {
		if (result.credential) {
			const params = { token: result.credential };
			try {
				const response = await axios.post('http://localhost:3000/patient/google', params);
				const data = response.data;
				console.log(data);
				alert(`Signup successful! Please check your email for instructions on how to reset your password.`)
				// Set token in local storage
				// Redirect to /dashboard
			} catch (error) {
				console.error(error);
			}
		}
	};

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
  	}, [googleClientId]);

    return(
        <div id="signInDiv" />
    )
}

export default GoogleSignIn;