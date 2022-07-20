import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import { useParams } from "react-router-dom";
import UpdatePost from "./UpdatePost";
export default function GetSinglePost() {
  const [isPending, setIsPending] = useState(true);

  const [post, getPost] = useState([]);
  const { id } = useParams();

  axios
    .get("http://localhost:3001/post/" + id)
    .then((response) => {
      // console.log(response);
      let post = response.data;
      setIsPending(false);
      // console.log(post);
      getPost(post);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="singlePost">
      <SinglePost post={post} isPending={isPending} />
    </div>
  );
}
