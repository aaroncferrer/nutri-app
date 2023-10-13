import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSignIn(props) {

	const { setCurrentUser, setLoading } = props;

	const navigate = useNavigate();
	
    const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

	const signInCallback = async (result) => {
		setLoading(true);
		if (result.credential) {
			const params = { token: result.credential };
			try {
				const response = await axios.post('http://localhost:3000/patient/google', params);
				const data = response.data;
				console.log(data);
				setLoading(false);
				alert('Signed in successfully!');
				setCurrentUser({data});
				navigate('/');

			}catch (error) {
				console.error(error);
			}finally {
				setLoading(false);
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