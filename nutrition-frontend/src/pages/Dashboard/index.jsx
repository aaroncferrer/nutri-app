import './dashboard.css';
import defaultImg from '../../assets/default-dp.png'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({currentUser}) {

    const [userDetails, setUserDetails] = useState(null)
    const [appointments, setAppointments] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('all')
    const token = currentUser.data.token;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/patients/${currentUser.data.patient.id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = response.data;
                setUserDetails(data);
                console.log(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchUserDetails();
    }, [currentUser.data.patient.id, token])

    const upcomingAppointments = userDetails?.appointments.filter(
        (appointment) => new Date(appointment.start_time) > new Date()
    );

    useEffect(() => {
        const fetchAppointments = async () => {
            try{
                const response = await axios.get('http://localhost:3000/appointments', 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = response.data;
                setAppointments(data);
                console.log(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchAppointments();
    }, [token])

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    }

    const filterAppointments = (filter) => {
        const now = new Date();
        switch(filter){
            case 'upcoming':
                return appointments.filter((appointment) => new Date(appointment.start_time) > now);
            case 'past':
                return appointments.filter((appointment) => new Date(appointment.end_time) < now);
            default:
                return appointments;
        }
    }
    
    const sortedAppointments = filterAppointments(selectedFilter).sort(
        (a, b) => new Date(a.start_time) - new Date(b.start_time)
    ); 

    return(
        <main className='dashboard'>
            <section className="dashboard_header">
                <h1>account dashboard</h1>
            </section>    

            <section className="profile_dash">
                <img src={defaultImg}></img>
                <div className="profile_info">
                    <h5>{`${userDetails?.patient.given_name} ${userDetails?.patient.family_name}`}</h5>
                    <h5>{userDetails?.patient.email}</h5>
                </div>
                <h5>Upcoming appointments: {upcomingAppointments?.length}</h5>
                <button className='custom_btn'>Edit Profile</button>
            </section>

            <section className="appointments_section">
                <div className="divider"></div>
                <h1>APPOINTMENTS</h1>
                    <div className="appointments_container">
                        <div className="filter_dropdown">
                            <label htmlFor="filterAppointments">Filter Appointments:</label>
                            <select
                            id="filterAppointments"
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            >
                                <option value="all">All</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </select>
                         </div>

                    {sortedAppointments.map((appointment => (
                        <div className="appointment" key={appointment.id}>
                            <div className="appointment_details">
                                <h6>{appointment.service}</h6>
                                <h6>Dietitian: {appointment.dietitian.given_name} {appointment.dietitian.family_name}</h6>
                            </div>
                            <div className="appointment_details">
                                <h6><span className='hidden'>Starts:</span> {new Date(appointment.start_time).toLocaleString()}</h6>
                                <h6><span className='hidden'>Ends:</span> {new Date(appointment.end_time).toLocaleString()}</h6>
                            </div>
                            <div className="appointment_details">
                                <h6><span className='hidden'>Duration:</span> {appointment.duration} minutes</h6>
                                <h6><a href={appointment.meet_link} target="_blank" rel='noreferrer'>Meeting Link</a></h6>
                            </div>
                            <button className='custom_btn'>Check Record</button>
                        </div>
                    )))}
                </div>
            </section>
        </main>
    )
}

export default Dashboard;