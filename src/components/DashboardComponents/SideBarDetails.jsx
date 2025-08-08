import React, { useState, useEffect } from "react";
import { Calendar, User, Mail, Phone, Settings, LogOut, Home, PieChart, FileText, Users, Bell } from "react-feather";
import '../../styles/DashboardComponent/SideBar.css'
import pic from '../../Resources/Images/image.png'

const SideBarDetails = function () {
    const [details, setDetails] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "+1 (555) 123-4567"
    });

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Update name once on mount
        setDetails(prev => ({
            ...prev,
            name: "asin"
        }));

        // Update current date
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }));
    }, []); // <- runs once

    const menuItems = [
        { icon: <Home size={18} />, label: "Dashboard" },
        { icon: <PieChart size={18} />, label: "Analytics" },
        { icon: <FileText size={18} />, label: "Reports" },
        { icon: <Users size={18} />, label: "Team" },
        { icon: <Bell size={18} />, label: "Notifications" },
        { icon: <Settings size={18} />, label: "Settings" }
    ];

    return (
        <div className="sidebar">
            <div className="profile-section">
                <div className="profile-image">
                    <img src={pic} alt="Profile" />
                </div>
                <div className="profile-details">
                    <div className="detail-item">
                        <User size={16} className="icon" />
                        <span>{details.name}</span>
                    </div>
                    <div className="detail-item">
                        <Mail size={16} className="icon" />
                        <span>{details.email}</span>
                    </div>
                    <div className="detail-item">
                        <Phone size={16} className="icon" />
                        <span>{details.mobile}</span>
                    </div>
                    <div className="detail-item">
                        <Calendar size={16} className="icon" />
                        <span>{currentDate}</span>
                    </div>
                </div>
            </div>

            <nav className="menu">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="menu-item">
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="logout-section">
                <LogOut size={18} className="icon" />
                <span>Log Out</span>
            </div>
        </div>
    );
};

export default SideBarDetails;