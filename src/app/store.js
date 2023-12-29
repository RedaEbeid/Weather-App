import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlice from '../weatherApiSlice';

export const store = configureStore({
  reducer: {
    weather: weatherApiSlice,
  },
});
