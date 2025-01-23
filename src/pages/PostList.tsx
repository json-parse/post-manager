import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPostByIdQuery } from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";
import { RootState } from "../redux/store.ts";

const PostList = ({ postId }) => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.status.value);
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
        <h1>{data.post.title}</h1>
        <p>{data.post.body}</p>
        <h2>Comments</h2>
        <ul>
          {data.comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </>
    );
  return <p>{status}</p>;
};

export default PostList;
