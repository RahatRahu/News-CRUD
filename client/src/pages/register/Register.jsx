import React, {useState} from "react";
import "./register.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    FullName: "",
    userEmail: "",
    password: "",
  });

  const [signupStatus, setSignupStatus] = useState("");

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const SignUp = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/signup", {
      userName: formData.userName,
      FullName: formData.FullName,
      userEmail: formData.userEmail,
      password: formData.password,
    }).then((response) => {
      setSignupStatus(response.data.user);
      navigate("/login");
    }).catch((error)=>{
      console.log(error);
    }
    );
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
      <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          name="userName"
          onChange={handleChange}
        />
          <label>Full Name</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your full name..."
          name="FullName"
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          name="userEmail"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          name="password"
          onChange={handleChange}
        />
        <button className="registerButton" onClick={SignUp}>Register</button>
      </form>
      <span className="loginAlert">
        Already have an account? Login <Link to="/login">here</Link>
      </span>
      <button className="registerLoginButton">
        <Link to="/login" className="link">Login</Link>
      </button>
    </div>
  );
}
