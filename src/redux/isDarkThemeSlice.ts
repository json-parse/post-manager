import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsDarkThemeState {
  value: boolean;
}

const initialState: IsDarkThemeState = {
  value: false,
};

const isDarkThemeSlice = createSlice({
  name: "isDarkTheme",
  initialState,
  reducers: {
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setDarkTheme } = isDarkThemeSlice.actions;
export default isDarkThemeSlice.reducer;
