import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { Track } from '../../types';
import { fetchAllTrackByAlbum } from './tracksThunk.ts';

interface TracksState {
  tracks: Track[];
  fetchingLoading: boolean;
  fetchError: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetchingLoading: false,
  fetchError: false,
}

export const selectTracks = (state: RootState) => state.tracks.tracks
export const selectTracksLoading = (state: RootState) => state.tracks.fetchingLoading

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAllTrackByAlbum.pending, (state) =>{
        state.fetchingLoading = true
      })
      .addCase(fetchAllTrackByAlbum.fulfilled, (state, {payload: tracks}) =>{
        state.fetchingLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchAllTrackByAlbum.rejected, (state) =>{
        state.fetchError = true
      })
  }
})

export const tracksReducer = tracksSlice.reducer;