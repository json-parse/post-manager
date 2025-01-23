import React, { useEffect } from "react";
import { useGetCommentsByPostIdQuery } from "../services/posts.ts";
import { useDispatch } from "react-redux";
import { setStatus } from "../redux/statusSlice.ts";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const {
    data: comments,
    error,
    isLoading,
  } = useGetCommentsByPostIdQuery(post.id);

  useEffect(() => {
    if (error) {
      dispatch(setStatus("error"));
    } else if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (comments) {
      dispatch(setStatus("idle"));
    }
  }, [isLoading, error, comments, dispatch]);

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h4>Comments ({comments?.length ?? 0})</h4>
    </>
  );
};

export default Post;
