import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const fetchAllTrackByAlbum = createAsyncThunk(
  'track/fetchAllTrackByAlbum',
  async (id: string) =>{
    const artistsResponse = await axiosApi(`tracks?album=${id}`);
    return artistsResponse.data || [];
  }
)