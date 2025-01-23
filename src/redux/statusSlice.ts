import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusState {
  value: string;
}

const initialState: StatusState = {
  value: "",
};

const STATUS_MSG = {
  loading: "Loading...",
  error: "Oh no, there was an error",
  noUser: "User does not exist",
  idle: initialState.value,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<"loading" | "error" | "noUser" | "idle">
    ) => {
      state.value = STATUS_MSG[action.payload];
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
