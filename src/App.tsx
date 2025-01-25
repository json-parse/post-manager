import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import Login from "./pages/Login.tsx";
import PostList from "./pages/PostList.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";

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

  return (
    <>
      <header>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              Post Manager
            </Typography>
            {data ? (
              <Typography variant="body2">Email: {data[0].email}</Typography>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <Container sx={{ py: 4 }}>
        {data ? (
          <PostList userId={data[0].id} />
        ) : (
          <Login setUsername={setUsername} />
        )}
      </Container>
    </>
  );
};

export default App;
