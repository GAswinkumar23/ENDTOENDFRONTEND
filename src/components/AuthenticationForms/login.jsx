import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthenticationForms/login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [token, Settoken] = useState("");
    const [userid, setUserId] = useState("");

    useEffect(() => {
        const checkTokenIspresent = () => {
            const temptoken = localStorage.getItem("token");
            const tempuserid = localStorage.getItem("userid");
            if (temptoken !== null) {
                Settoken(temptoken);
                setUserId(tempuserid);
            } else {
                Settoken(null);
            }
        };
        checkTokenIspresent();
    }, []);

    useLayoutEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const userIdFromServer = response.data.user.id;
                    setUserId(userIdFromServer);
                    console.log(userid);
                    localStorage.setItem("token", token);
                    localStorage.setItem("userid", userIdFromServer);
                    navigate('/dashboard');
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error("Verification failed:", err);
                navigate('/');
            }
        };

        if (token) verifyUser();
    }, [token, navigate, setUserId, userid]);


    //login thing

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("userid", user.id || user._id)
                navigate(`/dashboard`);
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                console.error("Unexpected error:", error);
            }

        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div id="login-form">
                    <li>
                        <ul>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </ul>
                        <ul>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </ul>
                        <ul>
                            <button type="submit">Login</button>
                        </ul>
                    </li>
                    <br />
                    <span onClick={() => navigate('/signup')}>
                        Don’t have an account? Sign Up
                    </span>
                </div>
            </form>
        </>
    );
}
export default Login;