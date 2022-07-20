import React, { useState, useEffect } from "react";
import "./singlePost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SinglePost(props) {
  const navigate = useNavigate();
  const { post, isPending } = props;
  const { id } = useParams();
  const [blogTitle, setblogTitle] = useState("");
  const [blogPost, setblogPost] = useState("");
  const [updatemode, setUpdatemode] = useState(false);

  // useEffect(() => {
  //   if (post) {
  //     setblogTitle(post.blogTitle);
  //     setblogPost(post.blogPost);
  //   }
  // }, [post]);

  const config = {
    headers: { "x-access-token": localStorage.getItem("token") },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blogTitle === null) {
      setblogTitle(post[0].blogTitle);
    }

    if (blogPost === null) {
      setblogPost(post[0].blogPost);
    }
    axios
      .put(
        `http://localhost:3001/updatepost/${id}`,
        {
          blogTitle: blogTitle,
          blogPost : blogPost,
        },
        config
      )
      .then((response) => {
        // console.log(response);
        navigate("/timeline");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(post);

  const deletePost = () => {
    console.log("delete post");
    axios
      .delete("http://localhost:3001/deletepost/" + id, config)
      .then((response) => {
        // console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isPending) {
    return <div>Loading...</div>;
  } else if (!isPending && post) {
    return (
      <div className="singlePost">
        <div className="singlePostWrapper">
          {updatemode ? (
            <textarea
              type="text"
              className="singlePostTitleInput"
    
              defaultValue={post[0].blogTitle}
              onChange={(e) => setblogTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {post[0].blogTitle}
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdatemode(true)}
                ></i>

                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={deletePost}
                ></i>
              </div>
            </h1>
          )}

          {updatemode ? null : (
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author: <b>{post[0].userName}</b>
              </span>
            </div>
          )}
          {updatemode ? (
            <textarea
              type="text"
              className="singlePostDescInput"
              defaultValue={post[0].blogPost}
              onChange={(e) => setblogPost(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{post[0].blogPost}</p>
          )}
        </div>
        {updatemode ? (
          <button className="singlePostUpdateBtn" onClick={handleSubmit}>
            Update
          </button>
        ) : null}
      </div>
    );
  }
}
