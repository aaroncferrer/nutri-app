import './profileDash.css';
import defaultImg from '../../assets/default-dp.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import Modal from 'react-bootstrap/Modal';

function ProfileDash(props) {

    const { currentUser, userRole, userId, token, loading, setLoading } = props;

    const googleAvatar = currentUser?.data?.data?.picture || null;

    const [userDetails, setUserDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        given_name: currentUser.data.user.given_name || '',
        family_name: currentUser.data.user.family_name || '',
    });

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.patch(`http://localhost:3000/patients/${userId}`,   
                {
                    patient: formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = response.data;
            alert(data.message);
            
            // Update userDetails state
            setUserDetails({ ...userDetails, user: { ...userDetails.user, ...formData } });

            // Update the currentUser in local storage
            const updatedUser = { ...currentUser.data.user, ...formData };
            localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, data: { user: updatedUser, token } })); 

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };
    
    useEffect(() => {
        setLoading(true);
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
                setLoading(false);
                console.log(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchUserDetails();
    }, [userId, userRole, token, setLoading, setUserDetails])

    const upcomingAppointments = userDetails?.appointments.filter(
        (appointment) => new Date(appointment.start_time) > new Date()
    );

    return(
        <section className="profile_dash">

            {loading && (
                <Spinner />
            )}

            {/* MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="edit_form" onSubmit={handleFormSubmit}>
                        <div className="input_group">
                            <label>Given name</label>
                            <input
                                type="text"
                                name="given_name"
                                id="given_name"
                                value={formData.given_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input_group">
                            <label htmlFor="family_name">Family Name</label>
                            <input
                                type="text"
                                name="family_name"
                                id="family_name"
                                value={formData.family_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="custom_btn">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='custom_btn' onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <img src={googleAvatar ? googleAvatar : defaultImg} alt="User Avatar" />
            <div className="profile_info">
                <h5>{`${userDetails?.user.given_name} ${userDetails?.user.family_name}`}</h5>
                <h5>{userDetails?.user.email}</h5>
            </div>
            <h5>Upcoming appointments: {upcomingAppointments?.filter(appointment => appointment.status !== "canceled").length}</h5>
            <button className='custom_btn' onClick={() => {userRole === "patient" ? setShowModal(true): alert('Feature not yet available')}}>Edit Profile</button>
        </section>
    )
}

export default ProfileDash;