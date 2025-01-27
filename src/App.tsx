import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import { removeToken, setToken } from "./redux/authSlice.ts";
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
  const { t } = useTranslation();
  const isAuthenticated = Boolean(
    useSelector((state: RootState) => state.auth.value)
  );

  const { data, error, isLoading } = useGetUserByUsernameQuery(username, {
    skip: !username, // Skip the query if username is empty
  });

  useEffect(() => {
    dispatch(removeToken());
    if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (error) {
      dispatch(setStatus("error"));
    } else if (!data?.length && username) {
      dispatch(setStatus("noUser"));
    } else if (data) {
      dispatch(setStatus("loading"));
      const randomToken = Math.random().toString(36);
      dispatch(setToken(`token/${data[0].id + randomToken}`));
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
            {isAuthenticated ? (
              <Button
                color="inherit"
                component={Link}
                to={"/es/login"}
                onClick={() => dispatch(removeToken())}
              >
                {t("logout")}
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={"/es/login"}>
                {t("login")}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path="/:lang" element={<Home />} />
          {data && isAuthenticated && (
            <Route path="/:lang/manager" element={<Manager user={data[0]} />} />
          )}
          <Route
            path="/:lang/login"
            element={<Login setUsername={setUsername} />}
          />
          <Route path="*" element={<Navigate to={"/es"} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
