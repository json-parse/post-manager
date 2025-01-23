import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPostByIdQuery } from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";

const Post = ({ postId }) => {
  const dispatch = useDispatch();
  // Using a query hook automatically fetches data and returns query values
  const { data, error } = useGetPostByIdQuery(postId);

  useEffect(() => {
    if (!data) {
      dispatch(setStatus("loading"));
    } else if (error) {
      dispatch(setStatus("error"));
    } else {
      dispatch(setStatus("idle"));
    }
  }, [error, data, dispatch]);

  if (data)
    return (
      <>
        <h2>{data.post.title}</h2>
        <p>{data.post.body}</p>
        <h4>Comments ({data.comments.length})</h4>
      </>
    );
  return null;
};

export default Post;
