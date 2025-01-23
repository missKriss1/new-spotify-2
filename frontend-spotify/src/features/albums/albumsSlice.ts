import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { albumsByArtists } from './albumsThunlk.ts';


interface AlbumsState {
  albums: Album[];
  fetchingLoading: boolean;
  fetchError: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  fetchingLoading: false,
  fetchError: false,
}

export const selectAlbum = (state: RootState) => state.albums.albums
export const selectAlbumsLoading = (state: RootState) => state.albums.fetchingLoading

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
      .addCase(albumsByArtists.pending, (state) =>{
        state.fetchingLoading = true
      })
      .addCase(albumsByArtists.fulfilled, (state, {payload: albums}) =>{
        state.fetchingLoading = false;
        state.albums = albums;
      })
      .addCase(albumsByArtists.rejected, (state) =>{
        state.fetchError = true
      })
  }
})

export const albumReducer = albumsSlice.reducer;