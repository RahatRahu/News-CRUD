import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter-square"></i>
        <i className="topIcon fa-brands fa-pinterest-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/profile" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={logout}>LOGOUT</li>
        </ul>
      </div>
      <div className="topRight">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/login" className="link">
              LOGIN
            </Link>
          </li>

          <li className="topListItem">
            <Link to="/register" className="link">
              REGISTER
            </Link>
          </li>
        </ul>
        <Link to="/profile">
        <img
          className="topImg"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
        ></img>
        </Link>

        <Link to="/settings">
        <i className="fa-solid fa-bars topSearchIcon"></i>
        </Link>
        
        
      </div>
    </div>
  );
}
