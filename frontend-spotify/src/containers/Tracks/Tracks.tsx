import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTracks, selectTracksLoading } from '../../features/tracks/tracksSlice.ts';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TrackCard from '../../components/TrackCard.tsx';
import { useEffect } from 'react';
import { deleteTrack, fetchAllTrackByAlbum, toggleTrackPublish } from '../../features/tracks/tracksThunk.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const Tracks = () => {
  const tracks = useAppSelector(selectTracks);
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(document.location.search);
  const tracksId = params.get('album');
  const loading = useAppSelector(selectTracksLoading);

  useEffect(() => {
    if (tracksId) {
      dispatch(fetchAllTrackByAlbum(tracksId));
    }
  }, [dispatch, tracksId]);

  const deleteTrackById = async (id: string) => {
    try {
      await dispatch(deleteTrack(id));
      if (tracksId) {
        await dispatch(fetchAllTrackByAlbum(tracksId));
      }
    } catch(error)  {
      console.error(error);
    }
  };

  const publishTrackClick = async (id: string) => {
    try{
      await dispatch(toggleTrackPublish(id))
      if (tracksId) {
        await dispatch(fetchAllTrackByAlbum(tracksId));
      }
    }catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Tracks
          </Typography>
          <hr />
          {tracks.length === 0 ? (
            <Typography>No tracks found</Typography>
          ) : (
            <Grid container spacing={2}>
              {tracks.map((track) => (
                <Grid size={{ xs: 6, md: 4 }} key={track._id}>
                  <TrackCard
                    track={track}
                    key={track._id}
                    deleteTrack={deleteTrackById}
                    publishTrack={publishTrackClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </div>
  );
};

export default Tracks;
