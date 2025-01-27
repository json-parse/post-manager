import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { removeToken } from "../redux/authSlice.ts";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { setLocation } from "../redux/locationSlice.ts";

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = Boolean(
    useSelector((state: RootState) => state.auth.value)
  );
  const location = useLocation();
  const path = location.pathname.split("/")[1];

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
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {t("postManager")}
          </Typography>
          {isAuthenticated ? (
            <Button
              color="inherit"
              component={Link}
              to={`/${path}/login`}
              onClick={() => dispatch(removeToken())}
            >
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
