import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingDetails } from "@/types";

interface BookingState {
  booking: BookingDetails | null;
}

const initialState: BookingState = {
  booking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking(state, action: PayloadAction<BookingDetails>) {
      state.booking = action.payload;
    },
    clearBooking(state) {
      state.booking = null;
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
