import axios from "axios";
import { useEffect } from "react";

function GoogleSignIn() {
    const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

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