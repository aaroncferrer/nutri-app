import './landingAbout.css';
import landingAboutImg from '../../assets/landing_about.png'

function LandingAbout() {
    return(
        <section id='landing_about'>

            <article className='landing_about_top'>
                <img src={landingAboutImg}></img>
            </article>

            <article className='landing_about_bottom'>
                <div className="landing_about_text_container">
                    <p className='landing_about_text'>Dedicated to guiding your path to healthier living through <span className='strong'>expert nutrition</span>.</p>
                    <p className='landing_about_text'>Unlocking a treasure trove of <span className='strong'>nutritional insights</span> through our digital platform.</p>
                    <p className='landing_about_text'>From <span className='strong'>personalized meal</span> planning to expert guidance, we&rsquo;re your health&rsquo;s steadfast ally.</p>
                </div>
            </article>
            
        </section>
    )
}

export default LandingAbout;