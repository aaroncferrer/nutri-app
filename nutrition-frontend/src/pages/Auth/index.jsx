import './auth.css'
import GoogleSignIn from '../../components/GoogleSignIn/'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Auth({setCurrentUser}) {

    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e, formSetter) => {
        const {name, value} = e.target;
        formSetter((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

   const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const patientResponse = await axios.post('http://localhost:3000/patient/login', loginFormData);
            const data = patientResponse.data;
            setCurrentUser({data});
            console.log(data);
            alert('Signed in successfully!');
            setLoginFormData({
                email: '',
                password: ''
            });
            navigate('/');
        } catch (patientError) {
            try {
                const dietitianResponse = await axios.post('http://localhost:3000/dietitian/login', loginFormData);
                const data = dietitianResponse.data;
                setCurrentUser({data});
                console.log(data);
                alert('Signed in successfully!');
                setLoginFormData({
                    email: '',
                    password: ''
                });
                navigate('/');
            } catch (dietitianError) {
                alert(dietitianError.response?.data?.error || "Login failed");
            }
        }
    }

    return(
        <main className="auth">
            <div className="auth_card">
                <h3>Log in</h3>
                <div className="google_container">
                    <GoogleSignIn setCurrentUser={setCurrentUser}/>
                </div>
                <span className='or_line'>or</span>
                <h6>Log in using email address</h6>
                <form className='auth_form' onSubmit={handleLogin}>
                    <input
                        className='auth_input'
                        type="email"
                        name="email"
                        value={loginFormData.email}
                        onChange={(e) => handleChange(e, setLoginFormData)}
                        required
                        placeholder="Email Address"
                    />
                    <input
                        className='auth_input' 
                        type="password"
                        name="password"
                        value={loginFormData.password}
                        onChange={(e) => handleChange(e, setLoginFormData)}
                        required
                        placeholder="Password"
                    />
                    <button className='custom_btn' onClick={handleLogin}>Log in</button>
                </form>
                <h6>Need to create an account? <Link to='/signup'>Sign up</Link></h6>
            </div>
        </main>
    )
}

export default Auth;