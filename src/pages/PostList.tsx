import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPostsByUserIdQuery } from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";
import { RootState } from "../redux/store.ts";
import Post from "../components/Post.tsx";

const PostList = ({ userId }) => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.status.value);
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPostsByUserIdQuery(userId);

  useEffect(() => {
    if (error) {
      dispatch(setStatus("error"));
    } else {
      dispatch(setStatus("loading"));
    }
  }, [isLoading, error, data, dispatch]);

  if (data)
    return (
      <>
        {data.map((post) => (
          <Post key={post.id} postId={post.id} />
        ))}
        {status && <p>{status}</p>}
      </>
    );
  return <p>{status}</p>;
};

export default PostList;
