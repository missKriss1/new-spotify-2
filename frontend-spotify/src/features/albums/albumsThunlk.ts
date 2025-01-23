import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const albumsByArtists = createAsyncThunk(
  'albums/albumsByArtists',
  async (artistId: string) =>{
    const {data: albums} = await axiosApi.get(`/albums?artist=${artistId}`);
    return albums || [];
  }
)