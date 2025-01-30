import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album } from '../../types';

export const fetchAdminAlbums = createAsyncThunk<Album[], void>(
  'endpoints/adminAlbums/fetchAdminAlbums',
  async () =>{
    const artistsResponse = await axiosApi<Album[]>('/endpoints/albums');
    return artistsResponse.data || [];
  }
)
