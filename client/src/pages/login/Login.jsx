import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    userEmail: "",
    password: "",
  });

  const [loginStatus, setloginStatus] = useState("");

  function handleChange(event) {
    setloginData((prevloginData) => {
      return {
        ...prevloginData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      userEmail: loginData.userEmail,
      password: loginData.password,
    })
      .then((response) => {
        console.log(response.data);

        setloginStatus(response.data.user);
        if (response.data.user === "login successfull") {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else
          alert("login failed");
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Email</label>
        <input
          type="email"
          className="loginInput"
          placeholder="Enter your email..."
          name="userEmail"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          name="password"
          onChange={handleChange}
        />
        <button className="loginButton" onClick={login}>
          Login
        </button>
      </form>
      <span className="registerAlert">
        Don't have an account? Register <Link to="/register">here</Link>
      </span>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
