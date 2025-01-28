import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album, IAlbumMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const albumsByArtists = createAsyncThunk(
  'albums/albumsByArtists',
  async (artistId: string) =>{
    const {data: albums} = await axiosApi.get(`/albums?artist=${artistId}`);
    return albums || [];
  }
)

export const addAlbum= createAsyncThunk<
  Album,
  IAlbumMutation,
  { state: RootState; rejectValue: ValidationError }
>(
  "albums/addArtist",
  async (albumMutation, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;

    try {
      const formData = new FormData();
      const keys = Object.keys(albumMutation) as (keyof IAlbumMutation)[];

      keys.forEach((key) => {
        const value = albumMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post<Album>("/albums", formData, {
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
);