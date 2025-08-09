import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/DashboardComponent/AddEvent.css';
const AddEvents = () => {
    const [eventName, setEventName]= useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventdate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventPriority, setEventPriority] = useState("low");
    const navigate = useNavigate();
    const userId = localStorage.getItem("UserId");
    const handlehubmit=(e)=> 
    {
        e.preventDefault();
        axios.post('http://localhost:5000/api/eventadd', {
            title: eventName,
            description: eventDescription,
            date: eventdate,
            time: eventTime,
            priority: eventPriority,
             userId: userId
        }).then((response) => {
            console.log(response.data);
            alert(response.data.message);
            if(response.data.status === 201) {
                alert("Event added successfully");
                navigate('/dashboard');
            }
        }).catch((error) => {
            console.error("There was an error adding the event!", error);
        });
        setEventName("");
        setEventDescription("");
        setEventDate("");       
        setEventTime("");
        setEventPriority("low");
        e.target.reset();
    }
    return (<>
            <form onSubmit={handlehubmit}>
                <div className="form-group">
                    <li>
                        <ul>
                            <label htmlFor="eventName">Event Title</label>
                            <input type="text" 
                            className="form-control"
                             id="eventName" 
                             placeholder="Enter event name"
                             value={eventName} 
                             onChange={(e)=>{setEventName(e.target.value)}} />
                        </ul>
                        <ul>
                            <label htmlFor="eventDescription">Event Description</label>
                            <input type="text" 
                            className="form-control" 
                            id="eventDescription" 
                            placeholder="Enter event description" 
                            value={eventDescription} 
                            onChange={(e)=>{setEventDescription(e.target.value)}}/>
                        </ul>
                        <ul>
                            <label htmlFor="eventDate">Event Date</label>
                            <input type="date" 
                            className="form-control" 
                            id="eventDate" 
                            placeholder="Enter event date" 
                            value={eventdate} 
                            onChange={(e)=>{setEventDate(e.target.value)}}  />
                        </ul>
                        <ul>
                            <label htmlFor="eventTime">Event Time</label>
                            <input type="time" 
                            className="form-control" 
                            id="eventTime" 
                            placeholder="Enter event time" 
                            value={eventTime} 
                            onChange={(e)=>{setEventTime(e.target.value)}}/>
                        </ul>
                        <ul>
                            <li>
                                <label htmlFor="priority">Priority</label>
                                <select className="form-control" id="priority" 
                                onChange={(e)=> setEventPriority(e.target.value)} 
                                value={eventPriority}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </li>
                        </ul>
                    </li>
                    <button type="submit">Add the Event</button>
                </div>
                
            </form>
    </>);
}
export default AddEvents;