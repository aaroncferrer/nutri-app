import './auth.css'
import GoogleSignIn from '../../components/GoogleSignIn/'

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
                    className='test'
                        type="email"
                        name="email"
                        // value
                        // onChange
                        required
                        placeholder="Email Address"
                    />
                    <input
                    className='test' 
                        type="password"
                        name="password"
                        // value=
                        // onChange
                        required
                        placeholder="Password"
                    />
                    <button className='custom_btn'>Log in</button>
                </form>
                <h6>Need to create an account? <a href='#'>Sign up</a></h6>
            </div>
        </main>
    )
}

export default Auth;