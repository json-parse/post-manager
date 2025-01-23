import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import Login from "./pages/Login.tsx";
import PostList from "./pages/PostList.tsx";

const App = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetUserByUsernameQuery(username, {
    skip: !username, // Skip the query if username is empty
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (error) {
      dispatch(setStatus("error"));
    } else if (!data && username) {
      dispatch(setStatus("noUser"));
    } else if (data) {
      dispatch(setStatus("loading"));
    }
  }, [isLoading, error, data, username, dispatch]);

  if (data)
    return (
      <>
        <p>Email: {data[0].email}</p>
        <PostList userId={data[0].id} />
      </>
    );
  return <Login setUsername={setUsername} />;
};

export default App;
