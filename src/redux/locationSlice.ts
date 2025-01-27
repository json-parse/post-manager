import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  value: string;
}

const initialState: LocationState = {
  value: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<"en" | "es">) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
