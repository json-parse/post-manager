import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./statusSlice.ts";
import authReducer from "./authSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "../services/posts.ts";

export const store = configureStore({
  reducer: {
    status: statusReducer,
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [postApi.reducerPath]: postApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
