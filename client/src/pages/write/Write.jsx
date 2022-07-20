import React,{useState} from "react";
import "./write.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Write() {
  const navigate = useNavigate();
  const [writeData, setWriteData] = useState({
    blogTitle: "",
    blogPost: "",
  });

  const [writeStatus, setWriteStatus] = useState("");
  function handleChange (event) {
    setWriteData((prevWriteData) => {
      return {
        ...prevWriteData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const config = {
    headers: {"x-access-token": localStorage.getItem("token")},
  };

  const write = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/postblog",{
      blogTitle: writeData.blogTitle,
      blogPost: writeData.blogPost,
    }, config).then((response) => {
      setWriteStatus(response.data.blog);
      navigate("/");
    }).catch((error) => {
      console.log(error);
    }
    );
  }
  return (
    <div className="write">
        <img
        className="writeImg"
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt=""
        />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i class="fa-solid fa-plus writeIcon"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />

          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            name="blogTitle"
            onChange={handleChange}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            name="blogPost"
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="writeSubmit" onClick={write}>Publish</button>
      </form>
    </div>
  );
}
