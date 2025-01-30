import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artists } from '../../types';
import axiosApi from '../../axiosApi.ts';


export const fetchAdminArtists = createAsyncThunk<Artists[], void>(
  'endpoints/adminArtists/fetchArtists',
  async () =>{
    const artistsResponse = await axiosApi<Artists[]>('/endpoints/artists');
    return artistsResponse.data || [];
  }
)




