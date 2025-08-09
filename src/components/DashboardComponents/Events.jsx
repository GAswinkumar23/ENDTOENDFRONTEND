import { useEffect, useState } from "react";
import { CheckCircle, Circle, Clock, Edit, Trash2, Plus } from "react-feather";
import '../../styles/DashboardComponent/Events.css';
import { useNavigate } from "react-router-dom";

const Events = () => {
    const navigator = useNavigate();
    // const [userid, setUserid] = useState('');
    const [name, setName] = useState('');
    const [events, setEvents] = useState([
        {
            id: 1,
            description: "Team meeting with project stakeholders",
            time: "2025-08-07T10:00:00",
            reminder: true,
            completed: false
        },
        {
            id: 2,
            description: "Doctor appointment",
            time: "2025-08-08T15:30:00",
            reminder: false,
            completed: true
        },
        {
            id: 3,
            description: "Submit monthly report",
            time: "2025-08-09T09:00:00",
            reminder: true,
            completed: false
        },
        {
            id: 4,
            description: "Call with client",
            time: "2025-08-10T13:45:00",
            reminder: false,
            completed: false
        }
    ]);
    console.log(name);
    useEffect(() => {
        setName("aswinkumatg");
    }, []);

    const toggleStatus = (id) => {
        setEvents(events.map(event => 
            event.id === id ? {...event, completed: !event.completed} : event
        ));
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="events-container">
            <h2>My Events</h2>
            <div className="events-list">
                {events.map((event) => (
                    <div key={event.id} className={`event-card ${event.completed ? 'completed' : ''}`}>
                        <div className="event-status" onClick={() => toggleStatus(event.id)}>
                            {event.completed ? 
                                <CheckCircle size={20} className="completed-icon" /> : 
                                <Circle size={20} className="pending-icon" />
                            }
                        </div>
                        <div className="event-details">
                            <h3>{event.description}</h3>
                            <div className="event-time">
                                <Clock size={16} />
                                <span>{formatTime(event.time)}</span>
                                {event.reminder && <span className="reminder-badge">Reminder</span>}
                            </div>
                        </div>
                        <div className="event-actions">
                            <button className="edit-btn">
                                <Edit size={16} />
                            </button>
                            <button className="delete-btn" onClick={() => deleteEvent(event.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={()=>{navigator('/events/add')}}className="add-event-btn">
                <Plus size={18} />
                Add New Event
            </button>
        </div>
    );
};

export default Events;