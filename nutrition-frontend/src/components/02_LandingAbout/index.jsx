import './landingAbout.css';
import landingAboutImg from '../../assets/landing_about.png'
import { motion } from 'framer-motion'

function LandingAbout() {

    const container = {
        hidden: {opacity: 1, scale: 0},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.35,
                staggerChildren: 0.25
            }
        }
    };

    const item = {
        hidden : {y: 100, opacity: 0},
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return(
        <section id='landing_about'>

            <article className='landing_about_top'>
                <img data-aos="fade-right" data-aos-duration="2000" data-aos-once src={landingAboutImg}></img>
            </article>

            <article className='landing_about_bottom'>

                <motion.div 
                    className="landing_about_text_container"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p variants={item} className='landing_about_text'>Dedicated to guiding your path to healthier living through <span className='strong'>expert nutrition</span>.</motion.p>
                    <motion.p variants={item} className='landing_about_text'>Unlocking a treasure trove of <span className='strong'>nutritional insights</span> through our digital platform.</motion.p>
                    <motion.p variants={item} className='landing_about_text'>From <span className='strong'>personalized meal</span> planning to expert guidance, we&rsquo;re your health&rsquo;s steadfast ally.</motion.p>
                </motion.div>

            </article>
            
        </section>
    )
}

export default LandingAbout;