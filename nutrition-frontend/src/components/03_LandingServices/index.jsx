import './landingServices.css'
import axios from "axios";
import { useEffect, useState } from "react";

function LandingServices() {
    const [eventTypes, setEventTypes] = useState([]);

	useEffect(() => {
		const fetchEventTypes = async () => {
		try {
			const response = await axios.get('http://localhost:3000/get_user_event_types');
			setEventTypes(response.data.collection);
			console.log(response.data.collection)
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
            <div className="landing_services_container">
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
                            <button className='custom_btn'>LEARN MORE</button>
                        </div>
                    ))}    
                </article>
            </div>
        </section>
    )
}

export default LandingServices;