import { useEffect } from 'react';
import './services.css';
import servicesData from './services.json';

function Services({currentUser}) {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    const services = servicesData.services;

    return(
        <>
            <main className='services'>
                <section className="services_header">
                    <h1>services</h1>
                </section>

                <section className="services_card_container">
                    {services.map((service => (
                        <article className="service_card" key={service.id}>
                            <div className="service_img_container">
                                <img src={service.image} className='service_img'></img>
                            </div>
                            <div className="service_text">
                                <h4>{service.name}</h4>
                                <h6>{service.duration} MINUTES</h6>
                                <span>{service.note ? `*${service.note}` : null}</span>
                                <div className="service_line"></div>
                                <p>{service.description_01}</p>
                                <p>{service.description_02}</p>
                                <p>{service.description_03}</p>
                                <div className="service_line"></div>
                                <a
                                    className={`${currentUser === null ? 'disabled' : 'custom_btn'} service_btn  `}
                                    href={service.scheduling_url}
                                    disabled={currentUser === null}
                                    target="_blank" 
                                    rel='noreferrer'
                                >
                                    {currentUser === null ? "LOGIN TO SCHEDULE" : "SCHEDULE NOW"}
                                </a>
                            </div>
                        </article>
                    )))}
                </section>
            </main>
        </>
    )
}

export default Services;