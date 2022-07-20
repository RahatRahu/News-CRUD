import React from "react";
import "./post.css";
import { Link, useNavigate } from "react-router-dom";

export default function Post(props) {
  const navigate = useNavigate();
  // const navigateSingle = () => {
  //   navigate(`/singlePost/${props.blogNumber}`);
    
  // }

  const { posts } = props;
  if (posts) {
    return posts.map((post, index) => {
      return (
        <div className="post" key={index}>
           
          <img
            className="postImg"
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div className="postInfo">
            <div className="postCats">
              <span className="postCat">Music</span>
              <span className="postCat">Life</span>
            </div>
            <Link to={`/post/${post.blogNumber}`} className="link">
            <span className="postTitle" key={index}>{post.blogTitle}</span>
            </Link>
            
            <span className="postAuthor">Author: {post.userName}</span>
            <hr />
          
          </div>
          <p className="postDesc">
            {post.blogPost}
          </p>
        </div>
      );
    })
  }
  
}
