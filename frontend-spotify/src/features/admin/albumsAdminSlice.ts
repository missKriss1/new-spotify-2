import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAdminAlbums } from './albumsAdminthunk.ts';

interface AlbumsAdminState {
  albums: Album[];
  fetchingLoading: boolean;
  fetchError: boolean;
}

const initialState: AlbumsAdminState = {
  albums: [],
  fetchingLoading: false,
  fetchError: false,
}

export const selectAlbumAdmin = (state: RootState) => state.adminAlbums.albums
export const selectAlbumsLoading = (state: RootState) => state.albums.fetchingLoading

export const albumsAdminSlice = createSlice({
  name: "endpoints/albums",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAdminAlbums.pending, (state) =>{
        state.fetchingLoading = true
      })
      .addCase(fetchAdminAlbums.fulfilled, (state, {payload: albums}) =>{
        state.fetchingLoading = false;
        state.albums = albums;
      })
      .addCase(fetchAdminAlbums.rejected, (state) =>{
        state.fetchError = true
      })
  }
})

export const albumAdminReducer = albumsAdminSlice.reducer;