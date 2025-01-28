import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artists, IArtistMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<Artists[], void>(
  'artists/fetchArtists',
  async () =>{
    const artistsResponse = await axiosApi<Artists[]>('/artists');
    return artistsResponse.data || [];
  }
)
export const getArtistById = createAsyncThunk(
  'artists/getArtistById',
  async (id: string) =>{
    const {data: artist} = await axiosApi.get(`/artists/${id}`);
    return artist || [];
  }
)

export const addArtist = createAsyncThunk<
  Artists,
  IArtistMutation,
  { state: RootState; rejectValue: ValidationError }
>(
  "artists/addArtist",
  async (artistMutation, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;

    try {
      const formData = new FormData();
      const keys = Object.keys(artistMutation) as (keyof IArtistMutation)[];

      keys.forEach((key) => {
        const value: string | File | null = artistMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post<Artists>("/artists", formData, {
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


