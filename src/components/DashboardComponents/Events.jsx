//import { useEffect } from "react";
import { CheckCircle, Circle, Clock, Edit, Trash2, Plus } from "react-feather";
import '../../styles/DashboardComponent/Events.css';
import { useNavigate } from "react-router-dom";
import useDetails from "../CustomHook/useDetails";

const Events = ({ userid }) => {
    const navigator = useNavigate();
    const { events, setEvent, uname } = useDetails(userid);

    const toggleStatus = (id) => {
        setEvent(events.map(event =>
            event._id === id ? { ...event, completed: !event.completed } : event
        ));
    };

    const deleteEvent = (id) => {
        setEvent(events.filter(event => event._id !== id));
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
            <h2>{uname ? `${uname}'s Events` : "My Events"}</h2>
            <div className="events-list">
                {events.map((event) => (
                    <div key={event._id} className={`event-card ${event.completed ? 'completed' : ''}`}>
                        <div className="event-status" onClick={() => toggleStatus(event._id)}>
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
                            <button className="delete-btn" onClick={() => deleteEvent(event._id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigator('/events/add') }} className="add-event-btn">
                <Plus size={18} />
                Add New Event
            </button>
        </div>
    );
};

export default Events;