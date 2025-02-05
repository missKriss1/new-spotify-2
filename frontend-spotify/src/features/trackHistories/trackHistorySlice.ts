import { TrackHistory } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { allTrackHistory, postTrackHistoryById } from "./trackHistoruThunk.ts";

interface TrackHistoryState {
  trackHistory: TrackHistory[];
  loadingHistory: boolean;
  errorHistory: boolean;
}

const initialState: TrackHistoryState = {
  trackHistory: [],
  loadingHistory: false,
  errorHistory: false,
};

export const selectTrackHistory = (state: RootState) =>
  state.track_history.trackHistory;
export const selectTrackHistoryError = (state: RootState) =>
  state.track_history.errorHistory;
export const selectTrackHistoryLoading = (state: RootState) =>
  state.track_history.loadingHistory;

export const trackHistorySlice = createSlice({
  name: "track_history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTrackHistoryById.pending, (state) => {
        state.loadingHistory = true;
        state.errorHistory = false;
      })
      .addCase(postTrackHistoryById.fulfilled, (state) => {
        state.loadingHistory = false;
      })
      .addCase(postTrackHistoryById.rejected, (state) => {
        state.errorHistory = true;
      })
      .addCase(allTrackHistory.pending, (state) => {
        state.loadingHistory = true;
        state.errorHistory = false;
      })
      .addCase(allTrackHistory.fulfilled, (state, { payload: track }) => {
        state.loadingHistory = false;
        state.trackHistory = track;
      })
      .addCase(allTrackHistory.rejected, (state) => {
        state.errorHistory = true;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
