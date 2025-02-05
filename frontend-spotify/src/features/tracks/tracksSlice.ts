import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { Track, ValidationError } from "../../types";
import { addTracks, fetchAllTrackByAlbum } from "./tracksThunk.ts";

interface TracksState {
  tracks: Track[];
  fetchingLoading: boolean;
  fetchError: boolean;
  isCreating: boolean;
  creatingError: ValidationError | null;
}

const initialState: TracksState = {
  tracks: [],
  fetchingLoading: false,
  fetchError: false,
  isCreating: false,
  creatingError: null,
};

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchingLoading;
export const selectCreatingError = (state: RootState) =>
  state.tracks.creatingError;
export const selectCreatingLoading = (state: RootState) =>
  state.tracks.isCreating;

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrackByAlbum.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchAllTrackByAlbum.fulfilled, (state, { payload: tracks }) => {
        state.fetchingLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchAllTrackByAlbum.rejected, (state) => {
        state.fetchError = true;
      })
      .addCase(addTracks.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addTracks.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addTracks.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.creatingError = error || null;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
