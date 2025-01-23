import { Artists } from '../types';
import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import zaglushka from '/src/assets/zaglushka.jpg';
import { apiUrl } from '../globalConstants.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  artist: Artists;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  const navigate = useNavigate();

  let imageZaglushka = zaglushka;

  if (artist.image) {
    imageZaglushka = `${apiUrl}/${artist.image}`;
  }

  const handleCardClick = () => {
    navigate(`/albums?artist=${artist._id}`);
  };

  return (
    <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
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
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {artist.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistCard;
