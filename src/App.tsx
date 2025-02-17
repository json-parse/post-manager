import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";
import { useGetUserByUsernameQuery } from "./services/posts.ts";
import { setStatus } from "./redux/statusSlice.ts";
import { setAuth } from "./redux/authSlice.ts";
import i18n from "./i18n.ts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import Login from "./pages/Login.tsx";
import Manager from "./pages/Manager.tsx";
import Home from "./pages/Home.tsx";
import NavBar from "./components/NavBar.tsx";

const App = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.value);
  const location = useSelector((state: RootState) => state.location.value);

  const { data, error, isLoading } = useGetUserByUsernameQuery(username, {
    skip: !username, // Skip the query if username is empty
  });

  const theme = createTheme({
    colorSchemes: {
      dark: useSelector((state: RootState) => state.isDarkTheme.value),
    },
  });

  useEffect(() => {
    i18n.changeLanguage(location);

    if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (error) {
      dispatch(setStatus("error"));
    } else if (!data?.length && username) {
      dispatch(setStatus("noUser"));
    } else if (data) {
      dispatch(setStatus("loading"));
      dispatch(setAuth(data[0]));
    }
  }, [isLoading, error, data, username, dispatch, location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Container sx={{ py: 4 }}>
          <Routes>
            <Route path="/:lang" element={<Home />} />
            {authUser && (
              <Route
                path="/:lang/manager"
                element={<Manager user={authUser} />}
              />
            )}
            <Route
              path="/:lang/login"
              element={<Login setUsername={setUsername} />}
            />
            <Route path="*" element={<Navigate to={`/${location}`} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
