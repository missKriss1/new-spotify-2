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
  async (newAlbum: IAlbumMutation, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;

    try {
      const response = await axiosApi.post<Album>("/albums", newAlbum, {
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

export const deleteAlbum= createAsyncThunk<void, string, { state: RootState }>(
  'albums/deleteAlbum',
  async (id: string, {getState}) =>{
    const token = getState().users.user?.token;

    await axiosApi.delete(`/albums/${id}`, {
      headers: { Authorization: token },
    });
  }
)