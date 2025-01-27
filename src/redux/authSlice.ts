import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "../services/types";

interface AuthState {
  value?: User;
}

const initialState: AuthState = {
  value: Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload: user }: PayloadAction<User>) => {
      Cookies.set("user", JSON.stringify(user), { expires: 1 }); //expires in 1 day
      state.value = user;
    },
    removeAuth: (state) => {
      Cookies.remove("user");
      state.value = Cookies.get("user");
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
