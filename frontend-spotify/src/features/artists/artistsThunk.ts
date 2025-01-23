import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artists } from '../../types';
import axiosApi from '../../axiosApi.ts';

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