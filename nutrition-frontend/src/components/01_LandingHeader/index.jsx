import './landingHero.css'
import logo from '../../assets/logo_white-plain.png'

function LandingHero() {
    return(
        <>
            <header id='landing_hero'>
                <div className="landing_hero_logo_container" data-aos="zoom-in" data-aos-duration="1500" data-aos-once>
                    <img className='landing_hero_logo' src={logo}></img>
                    <span className='landing_hero_text'>nutrition through bytes</span>
                </div>
            </header>
        </>
    )
}

export default LandingHero;