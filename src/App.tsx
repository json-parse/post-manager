import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import Login from "./pages/Login.tsx";
import PostList from "./pages/PostList.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
    } else if (!data?.length && username) {
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
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              Post Manager
            </Typography>
            {data?.length ? (
              <Typography variant="body2">{data[0].email}</Typography>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <Container sx={{ py: 4 }}>
        <Router>
          <Routes>
            {data?.length && (
              <Route path="/" element={<PostList user={data[0]} />} />
            )}
            <Route
              path="/login"
              element={
                <Login
                  setUsername={setUsername}
                  isAuthenticated={Boolean(data?.length)}
                />
              }
            />
            <Route path={"*"} element={<Navigate to={"/login"} />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
};

export default App;
