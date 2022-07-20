import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Post from '../post/Post';
export default function Posts() {
  const [posts, getPosts] = useState("");

  useEffect(() => {
    getAllPosts();
  }, []);

  // const config = {
  //   headers: {"x-access-token": localStorage.getItem("token")},
  // };

  const getAllPosts = () => {
    axios.get("http://localhost:3001/blogposts").then((response) => {
      console.log(response);
      const allPosts = response.data;
      getPosts(allPosts);
    }).catch((error) => {
      console.log(error);
    });
  };


  return (
    <div className='post'>
      <Post posts={posts}/>
    </div>
    
  )
}
