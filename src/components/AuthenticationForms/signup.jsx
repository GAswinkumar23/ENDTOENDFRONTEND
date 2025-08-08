import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/AuthenticationForms/signup.css';
const Signup = function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlesignup = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, mobile, password })
      });

      const data = await response.json();

      if (data.message === "user created successfully") {
        alert("Signup Successful");
        console.log(data);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.", error);
    }
  };
const handlelogintoken = async () => {
  const token = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("UserId");

  if (!token || !storedUserId) {
    return navigate('/');
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/user/${storedUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const user = response.data.user;
    const userId = user.id;
    localStorage.setItem("UserId", userId);

    if (user && userId) {
      return navigate(`/dashboard/${userId}`);
    } else {
      return navigate('/');
    }
  } catch (error) {
    return navigate('/');
  }
};
  return (
    <>
      <form onSubmit={handlesignup}>
        <div className="signup-form">
          <li>
            <ul>
              <label for="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </ul>
            <ul>
              <label for="email">Email</label>
              &nbsp;
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </ul>
            <ul>
              <label for="mobile">MobileNo.</label>
              <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </ul>
            <ul>
              <label for="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </ul>
            <button type="submit">Signup</button>
            <span onClick={handlelogintoken}><strong>Already have account, Login</strong></span>
          </li>
        </div>
      </form>
    </>);
}
export default Signup;