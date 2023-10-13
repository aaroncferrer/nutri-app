import './dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecordModal from '../../components/RecordModal';
import ProfileDash from '../../components/ProfileDash';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';

function Dashboard(props) {

    const { currentUser, loading, setLoading } = props;
    const navigate = useNavigate();

    const userRole = currentUser.data.user.role;
    const userId = currentUser.data.user.id;
    const token = currentUser.data.token;
    const [appointments, setAppointments] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [recordData, setRecordData] = useState(null);
    const [showCreateRecordForm, setShowCreateRecordForm] = useState(false);
    const [recordForm, setRecordForm] = useState({
        assessments: '',
        recommendations: '',
        notes: '',
    });
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [searchInput, setSearchInput] = useState('');

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
            setRecordForm({
                assessments: '',
                recommendations: '',
                notes: '',
            });
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
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
                setLoading(false);
                console.log(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchAppointments();
    }, [token, setLoading])

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

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

            {loading && (
                <Spinner />
            )}

            <RecordModal 
                loading={loading}
                showModal={showModal}
                setShowModal={setShowModal}
                recordData={recordData}
                recordForm={recordForm}
                setRecordForm={setRecordForm}
                handleSubmitRecord={handleSubmitRecord}
                handleCloseRecordForm={handleCloseRecordForm}
                userRole={userRole}
                handleCreateRecord={handleCreateRecord}
                showCreateRecordForm={showCreateRecordForm}
            />

            <section className="dashboard_header">
                <h1>account dashboard</h1>
            </section>    

            <ProfileDash 
                currentUser={currentUser}
                userRole={userRole}
                userId={userId}
                token={token}
                loading={loading}
                setLoading={setLoading}
            />

            <section className="appointments_section">
                <div className="divider"></div>
                <h1>APPOINTMENTS</h1>
                    {}
                    <div className="appointments_container">
                        <button className='book_btn' onClick={() => navigate('/services')}>BOOK APPOINTMENT</button>

                        <div className="filter_container">
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
                        <div className={`appointment ${appointment.status === "canceled" ? 'none' : ''}`} key={appointment.id}>
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