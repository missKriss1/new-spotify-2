import { Album } from '../types';
import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import zaglushka from '/src/assets/zaglushka.jpg';
import { apiUrl } from '../globalConstants.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/userSlice.ts';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const albumImage = album.image ? `${apiUrl}/${album.image}` : zaglushka;
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const clickByAlbum = () => {
    navigate(`/tracks?album=${album._id}`);
  };

  return (
    <div onClick={clickByAlbum} style={{ position: 'relative', cursor: 'pointer' }}>
      <Card sx={{ maxWidth: 345, boxShadow: 3, margin: '16px', position: 'relative' }}>
        {user?.role === 'admin' && !album.isPublished && (
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 0, 0, 0.8)',
              padding: '6px 12px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Unpublished
            </Typography>
          </Box>
        )}

        {user?._id === album.user._id && !album.isPublished && (
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 0, 0, 0.8)',
              padding: '6px 12px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Unpublished
            </Typography>
          </Box>
        )}

        <CardMedia
          component="img"
          sx={{
            width: 345,
            height: 345,
            objectFit: 'cover',
          }}
          image={albumImage}
          alt={album.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {album.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {album.date ? `Year: ${album.date}` : 'Year not available'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlbumCard;
