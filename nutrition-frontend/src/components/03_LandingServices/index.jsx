import './landingServices.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useApiUrl } from '../../ApiContext';

function LandingServices() {
    const apiUrl = useApiUrl();

    const navigate = useNavigate();

    const [eventTypes, setEventTypes] = useState([]);

	useEffect(() => {
		const fetchEventTypes = async () => {
		try {
			const response = await axios.get(`${apiUrl}/get_user_event_types`);
			setEventTypes(response.data.collection);
		} catch (error) {
			console.error('Error fetching event types:', error);
		}
		};
		fetchEventTypes();
	}, []); 

    const removeHTMLTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    }

    return(
        <section id="landing_services">
            <div className="landing_services_container" data-aos="fade-up" data-aos-duration="2000" data-aos-once>
                <h1>services</h1>
                <article className="note_container">
                    <h5>Note:</h5>
                    <p>Once booked, the patient will receive an email containing payment details. Full payment is required in advance of the scheduled service. For valid refund, the patient must cancel or reschedule their appointment at least 36 hours in advance.</p>
                </article>

                <article className="services_container">
                    {eventTypes.map((event) =>  (
                        <div className="service" key={event.uri}>
                            <h3>{event.name}</h3>
                            <h6>{event.duration} minutes</h6>

                            <div className="separating_line"></div>

                            <p>{removeHTMLTags(event.description_html)}</p>
                            <button className='custom_btn' onClick={() =>  navigate('/services')}>LEARN MORE</button>
                        </div>
                    ))}    
                </article>
            </div>
        </section>
    )
}

export default LandingServices;