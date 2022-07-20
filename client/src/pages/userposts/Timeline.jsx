import React, {useState,useEffect} from 'react'
import "./timeline.css";
import axios from "axios";
import Post from '../../components/post/Post';
export default function Timeline() {
  const [posts, getPosts] = useState([]);

  useEffect(() => {
    getPostOfUser();
  }, []);

  const config = {
    headers: {"x-access-token": localStorage.getItem("token")},
  };

    const getPostOfUser = () => {
       axios.get ("http://localhost:3001/userposts", config).then((response)=>{
          const userPosts = response.data;
            getPosts(userPosts);
       }).catch((error)=>{
            console.log(error);
       })
    }
  return (
    <div className='userPosts'>
        <Post posts={posts}/>
    </div>
  )
}
