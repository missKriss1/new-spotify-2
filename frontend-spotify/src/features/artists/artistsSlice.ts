import { Artists, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addArtist, fetchArtists, getArtistById, toggleArtistsPublish } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ArtistsState {
  artists: Artists[];
  artist: Artists |null;
  fetchingLoading: boolean;
  fetchError: boolean;
  isCreating: boolean;
  creatingError: ValidationError | null;
  unPublishedArtists: Artists[];
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  fetchingLoading: false,
  fetchError: false,
  isCreating: false,
  creatingError: null,
  unPublishedArtists: [],
}

export const selectArtists = (state: RootState) => state.artists.artists
export const selectOneArtist = (state: RootState) => state.artists.artist
export const selectArtistsLoading = (state: RootState) => state.artists.fetchingLoading
export const selectCreatingError = (state: RootState) => state.artists.creatingError
export const selectCreatingLoading = (state: RootState) => state.artists.isCreating
export const selectUnPublishedArtists = (state: RootState) => state.artists.unPublishedArtists

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
      .addCase(fetchArtists.pending, (state) =>{
         state.fetchingLoading = true
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) =>{
        state.fetchingLoading = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) =>{
        state.fetchError = true
      })
      .addCase(getArtistById.pending, (state) =>{
        state.fetchingLoading = true
      })
      .addCase(getArtistById.fulfilled, (state, {payload: artist}) =>{
        state.fetchingLoading = false;
        state.artist = artist;
      })
      .addCase(getArtistById.rejected, (state) =>{
        state.fetchError = true
      })
      .addCase(addArtist.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addArtist.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addArtist.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.creatingError = error || null;
      })
      .addCase(toggleArtistsPublish.pending, (state) => {
        state.fetchingLoading = true;
        state.fetchError = false;
      })
      .addCase(toggleArtistsPublish.fulfilled, (state) => {
        state.fetchingLoading = false;
      })
      .addCase(toggleArtistsPublish.rejected, (state) => {
        state.isCreating = false;
        state.fetchError = true
      })
  }
})

export const artistsReducer = artistsSlice.reducer;