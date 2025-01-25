import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = ({ setUsername, isAuthenticated }) => {
  const [defaultValue, setDefaultValue] = useState("Bret");
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.status.value);
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/manager");
    }
  }, [isAuthenticated, navigate]);

  const onLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setUsername(formData.get("username"));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "80vh" }}
    >
      <Grid size={{ md: 4 }}>
        <Card>
          <form onSubmit={onLogin}>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ p: 4, textAlign: "center" }}
              >
                {t("login")}
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                label={t("username")}
                name="username"
                value={defaultValue}
                onChange={(event) => setDefaultValue(event.target.value)}
                placeholder="Username"
              />
              {status && <p>{status}</p>}
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
              <Button variant="contained" type="submit">
                {t("login")}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
