import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectArtists, selectArtistsLoading } from '../../features/artists/artistsSlice.ts';
import { useEffect } from 'react';
import { fetchArtists } from '../../features/artists/artistsThunk.ts';
import ArtistCard from '../../components/ArtistCard.tsx';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading)

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ):(
        <>
          <h2 className='mt-3 mb-3 '>Artists:</h2>
          <hr/>
          <Box sx={{padding: 2}}>
            {artists.length === 0 ? (
              <>No artists</>
            ) : (
              <Grid container spacing={2}>
                {artists.map((artist) => (
                  <Grid size={{xs: 6, md: 4}} key={artist._id}>
                    <ArtistCard artist={artist}/>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </>
      )}

    </div>
  );
};

export default Artists;
