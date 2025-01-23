import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusState {
  value: string;
}

const STATUS_MSG = {
  loading: "loading...",
  error: "Oh no, there was an error",
  noUser: "User does not exist",
};

export const initialState: StatusState = {
  value: "",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.value = STATUS_MSG[action.payload];
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
