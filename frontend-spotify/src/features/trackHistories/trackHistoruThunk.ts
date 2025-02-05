import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { RootState } from "../../app/store.ts";

export const postTrackHistoryById = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("track_history/postTrackHistoryById", async (id: string, { getState }) => {
  const token = getState().users?.user?.token;
  if (token) {
    const track = await axiosApi.post(
      `/track_history`,
      { track: id },
      { headers: { Authorization: token } },
    );
    return track.data;
  }
});

export const allTrackHistory = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("track_history/allTrackHistory", async (_, { getState }) => {
  const token = getState().users?.user?.token;
  if (token) {
    const { data: track } = await axiosApi.get(`/track_history`, {
      headers: { Authorization: token },
    });
    return track || [];
  }
});
