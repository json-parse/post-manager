import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  value: string | null;
}

const initialState: AuthState = {
  value: Cookies.get("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload: token }: PayloadAction<string>) => {
      state.value = token;
      Cookies.set("token", token, { expires: 1 }); //expires in 1 day
    },
    removeToken: (state) => {
      state.value = null;
      Cookies.remove("token");
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
