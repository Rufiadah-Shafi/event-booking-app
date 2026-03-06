import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
