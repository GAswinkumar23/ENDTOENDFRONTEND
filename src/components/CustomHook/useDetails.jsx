import { useState } from "react";
import axiox from "axios";

const useDetails = (userid) => {
    //fetch events details
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState(new Date()); // default to current date
    const [priority, setPriority] = useState('');

    // Fetch user details
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const responseUser = axiox.get('http://localhost:5000/dashboard/:userid')
        .then(responseUser => {
            setUname(responseUser.data.user.name);
            setEmail(responseUser.data.user.email);
            setMobile(responseUser.data.user.mobile);
        });

    const responseEvents = axiox.get('http://localhost:5000/api/events')
        .then(responseEvents => {
            const events = responseEvents.data.events;
            if (events.length > 0) {
                setTitle(events[0].title);
                setDescription(events[0].description);
                setTime(events[0].time);
                setDate(new Date(events[0].date));
                setPriority(events[0].prority);
            }
        })
}