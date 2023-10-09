import './footer.css';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import logo from '../../assets/logo_blue-plain.png';

function Footer(){
    return(
        <footer id='contact'>
            
            <div className="container footer__container">
                <img className='footer_logo' src={logo}></img>
                <div className="footer__sections">
                    <a href='https://www.facebook.com/aaron91298/' target="_blank" rel='noreferrer'>FACEBOOK</a>
                    <a href='https://twitter.com/home' target="_blank" rel='noreferrer'>TWITTER</a>
                    <a href='https://www.instagram.com/aaroncferrer/' target="_blank" rel='noreferrer'>INSTAGRAM</a>
                    <a href='https://www.linkedin.com/in/anthony-renzo-ferrer/' target="_blank" rel='noreferrer'>LINKEDIN</a>
                </div>
                <div className="footer__copyright">
                    <p>Copyright © 2023 Anthony Ferrer All Rights Reserved.</p>
                    <div className="copyright__socials">
                        <a href="https://www.github.com/aaroncferrer" target="_blank" rel='noreferrer'><FaGithub /></a>
                        <a href="mailto:arcferrer5@gmail.com" target='_blank' rel='noreferrer'><AiOutlineMail /></a>
                    </div>
                    <a href='https://github.com/aaroncferrer/nutri-app' target="_blank" rel='noreferrer' className='footer__src'>Source Code</a>
                </div>
            </div>            

        </footer>
    )
}

export default Footer;