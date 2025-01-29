import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITrackMutation, Track, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchAllTrackByAlbum = createAsyncThunk(
  'track/fetchAllTrackByAlbum',
  async (id: string) =>{
    const artistsResponse = await axiosApi(`tracks?album=${id}`);
    return artistsResponse.data || [];
  }
)

export const addTracks = createAsyncThunk<
  Track,
  ITrackMutation,
  { state: RootState; rejectValue: ValidationError }
>(
  "tracks/addTracks",
  async (newTrack: ITrackMutation, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;

    try {
      const response = await axiosApi.post<Track>("/tracks", newTrack, {
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

export const deleteTrack= createAsyncThunk<void, string, { state: RootState }>(
  'tracks/deleteTrack',
  async (id: string, {getState}) =>{
    const token = getState().users.user?.token;

    await axiosApi.delete(`/tracks/${id}`, {
      headers: { Authorization: token },
    });
  }
)

