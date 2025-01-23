import { Album } from '../types';
import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import zaglushka from '/src/assets/zaglushka.jpg';
import { apiUrl } from '../globalConstants.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const albumImage = album.image ? `${apiUrl}/${album.image}` : zaglushka;
  const navigate = useNavigate();

  const clickByAlbum = () =>{
    navigate(`/tracks?album=${album._id}`);
  }


  return (
    <div onClick={clickByAlbum}>
      <Card sx={{ maxWidth: 345, boxShadow: 3, margin: '16px' }}>
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
