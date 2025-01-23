import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAlbum, selectAlbumsLoading } from '../../features/albums/albumsSlice.ts';
import AlbumCard from '../../components/AlbumCard.tsx';
import { useEffect } from 'react';
import { albumsByArtists } from '../../features/albums/albumsThunlk.ts';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { selectOneArtist } from '../../features/artists/artistsSlice.ts';
import { getArtistById } from '../../features/artists/artistsThunk.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const artist = useAppSelector(selectOneArtist);
  const params = new URLSearchParams(document.location.search);
  const artistId = params.get('artist');
  const loading = useAppSelector(selectAlbumsLoading)

  useEffect(() => {
    if(artistId) {
      dispatch(albumsByArtists(artistId));
      dispatch(getArtistById(artistId))
    }
  }, [dispatch, artistId]);

  return (
    <div >
      {loading ? (
        <Spinner />
      ):(
        <Box sx={{padding: 2}}>
          <Typography variant="h4" sx={{marginBottom: 2}}>
            Albums
          </Typography>
          <hr/>
          <h3 className="mb-2">
            Artist: {artist ? artist.name : 'Not found'}
          </h3>
          {albums.length === 0 ? (
            <Typography>No albums found</Typography>
          ) : (
            <Grid container spacing={2}>
              {albums.map((album) => (
                <Grid size={{xs: 6, md: 4}} key={album._id}>
                  <AlbumCard album={album}/>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </div>

  );
};

export default Albums;