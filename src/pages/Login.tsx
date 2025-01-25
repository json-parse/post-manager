import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

const Login = ({ setUsername }) => {
  const [defaultValue, setDefaultValue] = useState("Bret");
  const status = useSelector((state: RootState) => state.status.value);

  const onLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setUsername(formData.get("username"));
  };

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={onLogin}>
        <input
          name="username"
          value={defaultValue}
          onChange={(event) => setDefaultValue(event.target.value)}
          placeholder="Username"
        />
        <button type="submit">Login</button>
      </form>
      {status && <p>{status}</p>}
    </>
  );
};

export default Login;
