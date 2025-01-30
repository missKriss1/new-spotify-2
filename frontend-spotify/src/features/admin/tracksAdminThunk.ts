import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Track } from '../../types';

export const fetchAdminTracks = createAsyncThunk<Track[], void>(
  'endpoints/adminTracks/fetchAdminTracks',
  async () =>{
    const artistsResponse = await axiosApi<Track[]>('/endpoints/tracks');
    return artistsResponse.data || [];
  }
)


