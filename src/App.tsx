import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import { removeToken, setToken } from "./redux/authSlice.ts";
import i18n from "./i18n.ts";
import { Container } from "@mui/material";
import Login from "./pages/Login.tsx";
import Manager from "./pages/Manager.tsx";
import Home from "./pages/Home.tsx";
import NavBar from "./components/NavBar.tsx";

const App = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = Boolean(
    useSelector((state: RootState) => state.auth.value)
  );
  const location = useSelector((state: RootState) => state.location.value);

  const { data, error, isLoading } = useGetUserByUsernameQuery(username, {
    skip: !username, // Skip the query if username is empty
  });

  useEffect(() => {
    dispatch(removeToken());
    i18n.changeLanguage(location);

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
  }, [isLoading, error, data, username, dispatch, location]);

  return (
    <BrowserRouter>
      <NavBar />
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
          <Route path="*" element={<Navigate to={`/${location}`} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
