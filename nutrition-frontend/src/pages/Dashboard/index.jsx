import './dashboard.css';
import defaultImg from '../../assets/default-dp.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function Dashboard({currentUser}) {

    const userRole = currentUser.data.user.role;
    const userId = currentUser.data.user.id;
    const [userDetails, setUserDetails] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const token = currentUser.data.token;

    const [showModal, setShowModal] = useState(false);
    const [recordData, setRecordData] = useState(null);
    const [showCreateRecordForm, setShowCreateRecordForm] = useState(false);
    const [recordForm, setRecordForm] = useState({
        assessments: '',
        recommendations: '',
        notes: '',
    });
    const [loading, setLoading] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleCheckRecord = async (appointmentId) => {
        setLoading(true);
        setSelectedAppointmentId(appointmentId);
        try{
            const response = await axios.get(`http://localhost:3000/appointments/${appointmentId}/records`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = response.data;
            setRecordData(data);
            setShowModal(true);
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    const renderRecordContent = () => {
        if (loading) {
            return <p>Loading...</p>;
        } else if (recordData) {
            return(
                <div className="records_container">
                <h5>Assessments</h5>
                <p>{recordData.assessments}</p>
                <div className="divider"></div>
                <h5>Recommendations</h5>
                <p>{recordData.recommendations}</p>
                <div className="divider"></div>
                <span>Notes: {recordData.notes}</span>
                </div>
            );
        }else if (showCreateRecordForm) {
            return(
                <div className="create-record-form">
                    <h5>Assessments</h5>
                    <input
                        type="text"
                        value={recordForm.assessments}
                        onChange={(e) =>
                        setRecordForm({ ...recordForm, assessments: e.target.value })
                        }
                    />
                    <h5>Recommendations</h5>
                    <input
                        type="text"
                        value={recordForm.recommendations}
                        onChange={(e) =>
                        setRecordForm({ ...recordForm, recommendations: e.target.value })
                        }
                    />
                    <h5>Notes</h5>
                    <input
                        type="text"
                        value={recordForm.notes}
                        onChange={(e) =>
                        setRecordForm({ ...recordForm, notes: e.target.value })
                        }
                    />
                    <button className="custom_btn" onClick={handleSubmitRecord}>
                    Submit
                    </button>
                    <button className="custom_btn" onClick={handleCloseRecordForm}>
                    Close
                    </button>
                </div>
            );
        }else {
        // No record yet, show "Create Record" button
            if(userRole === "dietitian"){
                return(
                    <div>
                        <p>No Record yet</p>
                        <button className="custom_btn" onClick={handleCreateRecord}>
                            Create Record
                        </button>
                    </div>
                );
            }else {
                return <p>No Record yet</p>
            }

        }
    };

    const handleCreateRecord = () => {
        setShowCreateRecordForm(true);
    };

    const handleCloseRecordForm = () => {
        setShowCreateRecordForm(false);
        setShowModal(false);
    };

    const handleSubmitRecord = async () => {
        setLoading(true);
        
        try{
            const response = await axios.post(`http://localhost:3000/appointments/${selectedAppointmentId}/records`,
            {
                record: recordForm
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setRecordData(data);
            setShowCreateRecordForm(false);
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/${userRole}s/${userId}`, 
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
    }, [userId, userRole, token])

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
        return appointments.filter((appointment) => {
            const startTime = new Date(appointment.start_time);
            const endTime = new Date(appointment.end_time);
            const searchParts = searchInput.toLowerCase().split(' ');

        return (
            (filter === 'all' || (filter === 'upcoming' && startTime > now) || (filter === 'past' && endTime < now)) &&
            (searchInput.trim() === '' || 
                searchParts.every((part) =>
                    appointment.patient.given_name.toLowerCase().includes(part) ||
                    appointment.patient.family_name.toLowerCase().includes(part) ||
                    appointment.dietitian.given_name.toLowerCase().includes(part) ||
                    appointment.dietitian.family_name.toLowerCase().includes(part)
                )
            )
        );
        });
    };
    
    const sortedAppointments = filterAppointments(selectedFilter).sort(
        (a, b) => new Date(a.start_time) - new Date(b.start_time)
    ); 

    return(
        <main className='dashboard'>
            
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderRecordContent()}</Modal.Body>
                {recordData && (
                <Modal.Footer>
                    <button className="custom_btn" onClick={() => setShowModal(false)}>
                    Close
                    </button>
                </Modal.Footer>
                )}
        </Modal>

            <section className="dashboard_header">
                <h1>account dashboard</h1>
            </section>    

            <section className="profile_dash">
                <img src={defaultImg}></img>
                <div className="profile_info">
                    <h5>{`${userDetails?.user.given_name} ${userDetails?.user.family_name}`}</h5>
                    <h5>{userDetails?.user.email}</h5>
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
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                         </div>

                    {sortedAppointments.map((appointment => (
                        <div className="appointment" key={appointment.id}>
                            <div className="appointment_details">
                                <h6>{appointment.service}</h6>
                                <h6>
                                    {
                                        userRole === "dietitian"
                                        ? `Patient: ${appointment.patient.given_name} ${appointment.patient.family_name}`
                                        : `Dietitian: ${appointment.dietitian.given_name} ${appointment.dietitian.family_name}`
                                    }

                                </h6>
                            </div>
                            <div className="appointment_details">
                                <h6><span className='hidden'>Starts:</span> {new Date(appointment.start_time).toLocaleString()}</h6>
                                <h6><span className='hidden'>Ends:</span> {new Date(appointment.end_time).toLocaleString()}</h6>
                            </div>
                            <div className="appointment_details">
                                <h6><span className='hidden'>Duration:</span> {appointment.duration} minutes</h6>
                                <h6>
                                    {new Date(appointment.end_time) < new Date()
                                    ? "Done"
                                    : <a href={appointment.meet_link} target="_blank" rel='noreferrer'>Meeting Link</a>}
                                </h6>
                            </div>
                            <button className='custom_btn' onClick={() => handleCheckRecord(appointment.id)}>Check Record</button>
                        </div>
                    )))}
                </div>
            </section>
        </main>
    )
}

export default Dashboard;