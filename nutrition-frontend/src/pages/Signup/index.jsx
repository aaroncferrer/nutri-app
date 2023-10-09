import './signup.css';
import signupImg from '../../assets/logo_white-plain.png';
import GoogleSignIn from '../../components/GoogleSignIn';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();

    const [signupFormData, setSignupFormData] = useState({
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e, formSetter) => {
        const {name, value} = e.target;
        formSetter((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/patient/signup', 
            {
                patient: signupFormData
            })
            const data = response.data;
            alert(`Signup successful! Welcome to the community ${data.given_name}`)
            console.log(data);
            setSignupFormData({
                given_name: '',
                family_name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
            navigate('/auth')
        }catch(error){
            alert(error.response.data.errors[0]);
        }
    }

    return(
        <main className='signup'>
            <article className="signup_card">
                <div className="signup_img_container">
                    <img className='signup_img' src={signupImg}></img>
                </div>
                <form className="signup_form" onSubmit={handleSignup}>
                    <h3>SIGN UP</h3>
                    <h6>Create your account to achieve your nutri goal!</h6>
                    <div className="google_container">
                        <GoogleSignIn />
                    </div>
                    <span className='or_line'>or</span>
                    <input
                        className='signup_input'
                        type="text"
                        name="given_name"
                        value={signupFormData.given_name}
                        onChange={(e) => handleChange(e, setSignupFormData)}
                        required
                        placeholder="Given Name"
                    />
                    <input
                        className='signup_input'
                        type="text"
                        name="family_name"
                        value={signupFormData.family_name}
                        onChange={(e) => handleChange(e, setSignupFormData)}
                        required
                        placeholder="Family Name"
                    />
                    <input
                        className='signup_input'
                        type="email"
                        name="email"
                        value={signupFormData.email}
                        onChange={(e) => handleChange(e, setSignupFormData)}
                        required
                        placeholder="Email Address"
                    />
                    <input
                        className='signup_input'
                        type="password"
                        name="password"
                        value={signupFormData.password}
                        onChange={(e) => handleChange(e, setSignupFormData)}
                        required
                        placeholder="Password"
                    />
                    <input
                        className='signup_input' 
                        type="password"
                        name="password_confirmation"
                        value={signupFormData.password_confirmation}
                        onChange={(e) => handleChange(e, setSignupFormData)}
                        required
                        placeholder="Confirm Password"
                    />
                    <button className='custom_btn' onClick={handleSignup}>Sign up</button>
                    <p>Already have an account? <Link to='/auth' className='strong'>Login</Link></p>
                </form>
            </article>
        </main>
    )
}

export default Signup;