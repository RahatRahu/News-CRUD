import ProfileUI from "./ProfileUI";
import React, {useState,useEffect} from "react";
import axios from "axios";

export default function Profile() {
  const [profileInfo, getProfileInfo] = useState([]);

  useEffect(()=>{
    getAllUserInfo();
  },[]);

  const config = {
    headers: {"x-access-token": localStorage.getItem("token")},
  };
  console.log(config);

  const getAllUserInfo = () => {
    axios.get("http://localhost:3001/getuser", config).then((response) => {
      console.log(response.data);
      const allInfo = response.data;
      getProfileInfo(allInfo);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <ProfileUI profileInfo={profileInfo} />
  )
}
