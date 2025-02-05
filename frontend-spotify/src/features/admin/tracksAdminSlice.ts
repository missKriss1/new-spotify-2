import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { Track } from "../../types";
import { fetchAdminTracks } from "./tracksAdminThunk.ts";

interface TracksAdminState {
  tracks: Track[];
  fetchingLoading: boolean;
  fetchError: boolean;
}

const initialState: TracksAdminState = {
  tracks: [],
  fetchingLoading: false,
  fetchError: false,
};

export const selectTracksAdmin = (state: RootState) => state.adminTracks.tracks;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchingLoading;

export const tracksAdminSlice = createSlice({
  name: "endpoints/tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTracks.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchAdminTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchingLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchAdminTracks.rejected, (state) => {
        state.fetchError = true;
      });
  },
});

export const tracksAdminReducer = tracksAdminSlice.reducer;
