import { Album, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { addAlbum, albumsByArtists } from "./albumsThunlk.ts";

interface AlbumsState {
  albums: Album[];
  fetchingLoading: boolean;
  fetchError: boolean;
  isCreating: boolean;
  creatingError: ValidationError | null;
}

const initialState: AlbumsState = {
  albums: [],
  fetchingLoading: false,
  fetchError: false,
  isCreating: false,
  creatingError: null,
};

export const selectAlbum = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) =>
  state.albums.fetchingLoading;
export const selectCreatingLoading = (state: RootState) =>
  state.albums.isCreating;
export const selectCreatingError = (state: RootState) =>
  state.albums.creatingError;

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(albumsByArtists.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(albumsByArtists.fulfilled, (state, { payload: albums }) => {
        state.fetchingLoading = false;
        state.albums = albums;
      })
      .addCase(albumsByArtists.rejected, (state) => {
        state.fetchError = true;
      })
      .addCase(addAlbum.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addAlbum.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.creatingError = error || null;
      });
  },
});

export const albumReducer = albumsSlice.reducer;
