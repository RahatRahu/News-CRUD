import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function ProfileUI(props) {
  const { profileInfo } = props;
  const navigate = useNavigate();

  const navigateTimeline =()=> {
    navigate("/timeline");
  }

  if (profileInfo) {
    return profileInfo.map((profile, index) => {
      return (
        <div>
          <div className="profileDetails">
            <img
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              alt="profile"
              className="profileImg"
            />
            <div className="profileInfo">
              <h1>{profile.userName}</h1>
              <h2>{profile.FullName}</h2>
              <p>{profile.userEmail}</p>
            </div>
          </div>
          <div className="userPosts">
            <button className="showTimelineButton" onClick={navigateTimeline}>Tap to see Your Timeline</button>
          </div>
        </div>
      );
    });
  }
}
