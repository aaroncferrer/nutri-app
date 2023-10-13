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
				const patientResponse = await axios.post('https://nutri-avion.onrender.com/patient/google', params);
				const data = patientResponse.data;
				console.log(data);
				setLoading(false);
				alert('Signed in successfully as a patient!');
				setCurrentUser({data});
				navigate('/');
			}catch (patientError) {
				console.error('Patient sign-in failed:', patientError);
				try{
				// Attempt to sign in as a dietitian
					const dietitianResponse = await axios.post('https://nutri-avion.onrender.com/dietitian/google', params);
					const data = dietitianResponse.data;
					console.log(data);
					setLoading(false);
					alert('Signed in successfully as a dietitian!');
					setCurrentUser({data});
					navigate('/');
				}catch (dietitianError) {
					console.error('Dietitian sign-in failed:', dietitianError);
				}
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