import { useEffect, useState } from "react";
import axios from "axios";

const useDetails = (userid) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState(new Date());
    const [priority, setPriority] = useState('');

    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const [events, setEvent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userid) return;
        const fetchData = async () => {
            try {
                setLoading(true);

                const responseUser = await axios.get(`http://localhost:5000/User/${userid}`);
                setUname(responseUser.data.user.name);
                setEmail(responseUser.data.user.email);
                setMobile(responseUser.data.user.mobile);

                const responseEvents = await axios.get(`http://localhost:5000/event/${userid}`);
                const event = responseEvents.data.events || [];
                setEvent(event);

                if (event.length > 0) {
                    setTitle(event[0].title || '');
                    setDescription(event[0].description || '');
                    setTime(event[0].time || '');
                    setDate(event[0].date ? new Date(event[0].date) : new Date());
                    setPriority(event[0].priority || '');
                }
            } catch (error) {
                console.log("error fetching event details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userid]);

    return {
        title, setTitle,
        description, setDescription,
        time, setTime,
        date, setDate,
        priority, setPriority,
        uname, email, mobile,
        events, setEvent,
        loading
    };
};

export default useDetails;