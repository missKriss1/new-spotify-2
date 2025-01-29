import { Artists } from '../types';
import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import zaglushka from '/src/assets/zaglushka.jpg';
import { apiUrl } from '../globalConstants.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/userSlice.ts';

interface Props {
  artist: Artists;
  deleteArtist: (id: string) => void
}

const ArtistCard: React.FC<Props> = ({ artist, deleteArtist }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  let imageZaglushka = zaglushka;

  if (artist.image) {
    imageZaglushka = `${apiUrl}/${artist.image}`;
  }

  const handleCardClick = () => {
    navigate(`/albums?artist=${artist._id}`);
  };

  return user && (
    <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <Card sx={{ maxWidth: 345, boxShadow: 3, position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{
            width: 350,
            height: 350,
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          image={imageZaglushka}
          alt={artist.name}
        />
        <CardContent sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography gutterBottom variant="h6" component="div">
            {artist.name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              marginTop: '8px',
            }}
          >
          {(!artist.isPublished && (user.role === 'admin' || user._id === artist.user._id)) && (
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 0, 0, 0.8)',
                  padding: '6px 12px',
                  borderRadius: '8px',
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
            {user.role === 'admin' || user._id === artist.user._id ? (
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={(e) => {e.stopPropagation(); deleteArtist(artist._id)}}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  marginLeft: '16px',
                }}
              >
                Delete
              </Button>
            ) : null}
        </Box>


        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistCard;
