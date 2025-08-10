import { useState } from 'react';
import useDetails from "../CustomHook/useDetails";
import '../../styles/DashboardComponent/ProfileSection.css'
const ProfilePage = () => {
  const { uname, email, mobile, events } = useDetails();
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState({
    name: uname,
    email: email,
    mobile: mobile,
    eventCount: events.size
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
        <div className='main-container'>
        <div className="profileContainer">
      <h2 className="profileTitle">Profile</h2>
      <ul className="profileList">
        <li className="profileListItem">
          <span className="profileLabel">Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="profileInput"
            />
          ) : (
            <span className="profileValue">{formData.name}</span>
          )}
        </li>

        <li className="profileListItem">
          <span className="profileLabel">Email:</span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="profileInput"
            />
          ) : (
            <span className="profileValue">{formData.email}</span>
          )}
        </li>

        <li className="profileListItem">
          <span className="profileLabel">Mobile:</span>
          {isEditing ? (
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="profileInput"
            />
          ) : (
            <span className="profileValue">{formData.mobile}</span>
          )}
        </li>

        <li className="profileListItem">
          <span className="profileLabel">Upcoming Events:</span>
          {isEditing ? (
            <input
              type="number"
              name="eventCount"
              value={formData.eventCount}
              onChange={handleChange}
              className="profileInput"
            />
          ) : (
            <span className="profileValue">{formData.eventCount}</span>
          )}
        </li>
      </ul>

      <button className="profileButton" onClick={handleToggle}>
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
        </div>
  );
};

export default ProfilePage;