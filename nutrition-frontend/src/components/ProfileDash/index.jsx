import './profileDash.css';
import defaultImg from '../../assets/default-dp.png'
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProfileDash(props) {

    const { userRole, userId, token } = props;

    const [userDetails, setUserDetails] = useState(null);

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

    return(
        <section className="profile_dash">
            <img src={defaultImg}></img>
            <div className="profile_info">
                <h5>{`${userDetails?.user.given_name} ${userDetails?.user.family_name}`}</h5>
                <h5>{userDetails?.user.email}</h5>
            </div>
            <h5>Upcoming appointments: {upcomingAppointments?.length}</h5>
            <button className='custom_btn'>Edit Profile</button>
        </section>
    )
}

export default ProfileDash;