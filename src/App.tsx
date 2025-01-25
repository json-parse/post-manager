import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import Login from "./pages/Login.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Manager from "./pages/Manager.tsx";
import Home from "./pages/Home.tsx";
import { useTranslation } from "react-i18next";

const App = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserByUsernameQuery(username, {
    skip: !username, // Skip the query if username is empty
  });
  const { t } = useTranslation();

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
    <BrowserRouter>
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {t("postManager")}
            </Typography>
            {data?.length ? (
              <Typography variant="body2">{data[0].email}</Typography>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                {t("login")}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {data?.length && (
            <Route path="/manager" element={<Manager user={data[0]} />} />
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
      </Container>
    </BrowserRouter>
  );
};

export default App;
