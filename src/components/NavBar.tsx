import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { removeAuth } from "../redux/authSlice.ts";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { setLocation } from "../redux/locationSlice.ts";
import { setDarkTheme } from "../redux/isDarkThemeSlice.ts";

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = Boolean(
    useSelector((state: RootState) => state.auth.value)
  );
  const isDarkTheme = useSelector(
    (state: RootState) => state.isDarkTheme.value
  );
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const isHomePage = location.pathname === `/${path}`;

  useEffect(() => {
    if (path === "en" || path === "es") {
      dispatch(setLocation(path));
    } else {
      dispatch(setLocation("es"));
    }
  }, [location, path, dispatch]);

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={`/${path}`}
            sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
          >
            {t("postManager")}
          </Typography>
          <Button
            color="inherit"
            onClick={() => dispatch(setDarkTheme(!isDarkTheme))}
          >
            {t("theme")}
          </Button>
          {isAuthenticated && isHomePage && (
            <Button color="inherit" component={Link} to={`/${path}/manager`}>
              {t("manage")}
            </Button>
          )}
          {isAuthenticated ? (
            <Button color="inherit" onClick={() => dispatch(removeAuth())}>
              {t("logout")}
            </Button>
          ) : (
            <Button color="inherit" component={Link} to={`/${path}/login`}>
              {t("login")}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default NavBar;
