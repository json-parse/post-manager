import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";

const Login = ({ setUsername }) => {
  const [defaultValue, setDefaultValue] = useState("Bret");
  const status = useSelector((state: RootState) => state.status.value);

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
                Log in
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                name="username"
                value={defaultValue}
                onChange={(event) => setDefaultValue(event.target.value)}
                placeholder="Username"
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </CardActions>
          </form>
        </Card>
        {status && <p>{status}</p>}
      </Grid>
    </Grid>
  );
};

export default Login;
