import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthenticationForms/login.css';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("UserId", user.id);
                navigate(`/dashboard/${user.id}`);
            }
        }
        catch (error) {
            console.error("Login Failed:", error);
        }
    }
    return (<>
        <form onSubmit={handleLogin}>
            <div id="login-form">
                <li>
                    <ul>
                        <label for="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></ul>
                    <ul>
                        <label for="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </ul>
                    <ul>
                        <button type="submit">Login</button>
                    </ul>
                </li>

                <br></br>
                <span onClick={() => {
                    navigate('/signup');
                }}>Dont have account, SignUp</span>
            </div>
        </form>
    </>);
}
export default Login;