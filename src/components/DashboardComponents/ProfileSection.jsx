import { useState, useEffect } from 'react';
import useDetails from "../CustomHook/useDetails";
import '../../styles/DashboardComponent/ProfileSection.css';
import axios from 'axios';

const ProfilePage = ({ userid }) => {
  const { uname, email, mobile, events } = useDetails(userid);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    eventCount: 0
  });

  const [originalData, setOriginalData] = useState({});
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    mobile: false,
    eventCount: false
  });

  // ✅ Sync formData when user details are loaded
  useEffect(() => {
    if (uname || email || mobile || events) {
      const updated = {
        name: uname || '',
        email: email || '',
        mobile: mobile || '',
        eventCount: events?.size || 0
      };
      setFormData(updated);
      setOriginalData(updated);
    }
  }, [uname, email, mobile, events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: originalData[field]
    }));
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleSave = async (field) => {
    setEditing(prev => ({ ...prev, [field]: false }));
    try {
      const response = await axios.put(`http://localhost:5000/api/useredit/${userid}`, {
        [field]: formData[field]
      });
      // Optionally handle the response here
    } catch (err) {
      console.error("Error updating user details:", err.response);
      alert("Failed to update user details.");
    }
  };

  return (
    <div className='main-container'>
      <div className="profileContainer">
        <h2 className="profileTitle">Profile</h2>
        <ul className="profileList">

          {/* Name Field */}
          <li className="profileListItem">
            <span className="profileLabel">Name:</span>
            {editing.name ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="profileInput"
                />
                <button className="editButton" onClick={() => handleSave("name")}>Save</button>
                <button className="editButton" onClick={() => handleCancel("name")}>Cancel</button>
              </>
            ) : (
              <>
                <span className="profileValue">{formData.name}</span>
                <button className="editButton" onClick={() => handleEdit("name")}>Edit</button>
              </>
            )}
          </li>

          {/* Email Field */}
          <li className="profileListItem">
            <span className="profileLabel">Email:</span>
            {editing.email ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="profileInput"
                />
                <button className="editButton" onClick={() => handleSave("email")}>Save</button>
                <button className="editButton" onClick={() => handleCancel("email")}>Cancel</button>
              </>
            ) : (
              <>
                <span className="profileValue">{formData.email}</span>
                <button className="editButton" onClick={() => handleEdit("email")}>Edit</button>
              </>
            )}
          </li>

          {/* Mobile Field */}
          <li className="profileListItem">
            <span className="profileLabel">Mobile:</span>
            {editing.mobile ? (
              <>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="profileInput"
                />
                <button className="editButton" onClick={() => handleSave("mobile")}>Save</button>
                <button className="editButton" onClick={() => handleCancel("mobile")}>Cancel</button>
              </>
            ) : (
              <>
                <span className="profileValue">{formData.mobile}</span>
                <button className="editButton" onClick={() => handleEdit("mobile")}>Edit</button>
              </>
            )}
          </li>

          {/* Event Count Field */}
          <li className="profileListItem">
            <span className="profileLabel">Upcoming Events:</span>
            {editing.eventCount ? (
              <>
                <input
                  type="number"
                  name="eventCount"
                  value={formData.eventCount}
                  onChange={handleChange}
                  className="profileInput"
                />
                <button className="editButton" onClick={() => handleSave("eventCount")}>Save</button>
                <button className="editButton" onClick={() => handleCancel("eventCount")}>Cancel</button>
              </>
            ) : (
              <>
                <span className="profileValue">{formData.eventCount}</span>
                <button className="editButton" onClick={() => handleEdit("eventCount")}>Edit</button>
              </>
            )}
          </li>

        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;