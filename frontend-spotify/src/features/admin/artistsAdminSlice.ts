import { Artists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {fetchAdminArtists } from './artistAdminThunk.ts';

interface ArtistsAdminState {
  artists: Artists[];
  fetchingLoading: boolean;
  fetchError: boolean
}

const initialState: ArtistsAdminState = {
  artists: [],
  fetchingLoading: false,
  fetchError: false,
}

export const selectArtistsAdmin = (state: RootState) => state.adminArtists.artists
export const loading = (state: RootState) => state.adminArtists.fetchingLoading

export const artistsAdminSlice = createSlice({
  name: "endpoints/artists",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAdminArtists.pending, (state) =>{
        state.fetchingLoading = true
      })
      .addCase(fetchAdminArtists.fulfilled, (state, {payload: artists}) =>{
        state.fetchingLoading = false;
        state.artists = artists;
      })
      .addCase(fetchAdminArtists.rejected, (state) =>{
        state.fetchError = true
      })
  }
})

export const artistsAdminReducer = artistsAdminSlice.reducer;