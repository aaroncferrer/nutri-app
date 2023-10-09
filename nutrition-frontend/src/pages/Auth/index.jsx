import './auth.css'
import GoogleSignIn from '../../components/GoogleSignIn/'
import { Link } from 'react-router-dom';

function Auth() {

    return(
        <main className="auth">
            <div className="auth_card">
                <h3>Log in</h3>
                <div className="google_container">
                    <GoogleSignIn />
                </div>
                <span className='or_line'>or</span>
                <h6>Log in using email address</h6>
                <form className='auth_form'>
                    <input
                        className='auth_input'
                        type="email"
                        name="email"
                        // value
                        // onChange
                        required
                        placeholder="Email Address"
                    />
                    <input
                        className='auth_input' 
                        type="password"
                        name="password"
                        // value=
                        // onChange
                        required
                        placeholder="Password"
                    />
                    <button className='custom_btn'>Log in</button>
                </form>
                <h6>Need to create an account? <Link to='/signup'>Sign up</Link></h6>
            </div>
        </main>
    )
}

export default Auth;