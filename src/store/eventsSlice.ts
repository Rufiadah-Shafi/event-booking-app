import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "@/types";
import { transformPosts } from "@/lib/transformEvents";

interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return transformPosts(posts);
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    selectEvent(state, action) {
      state.selectedEvent =
        state.events.find((e) => e.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      });
  },
});

export const { selectEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
