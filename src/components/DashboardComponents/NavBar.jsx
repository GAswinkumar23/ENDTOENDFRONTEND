import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/DashboardComponent/NavBar.css';

const NavBar = function () {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="navbar-container">
            <nav className="navbar" aria-label="Main navigation">
                {/* Left side - Application name */}
                <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
                    <h2>My Reminder App</h2>
                </div>

                {/* Right side - Navigation links */}
                <ul className="nav-list">
                    <li className="nav-item" onClick={() => navigate('/home')}>
                        Home
                    </li>
                    <li className="nav-item" onClick={() => navigate('/profile/edit')}>
                        Edit Profile
                    </li>
                    <li className="nav-item" onClick={() => navigate('/history')}>
                        History
                    </li>
                    <li className="nav-item logout" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;