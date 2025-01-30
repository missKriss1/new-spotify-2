import { Track } from '../types';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/userSlice.ts';
import { postTrackHistoryById } from '../features/trackHistories/trackHistoruThunk.ts';
import { Box, Typography, Button, Card } from '@mui/material';

interface Props {
  track: Track;
  deleteTrack: (id: string) => void;
  publishTrack: (id: string) => void;
}

const TrackCard: React.FC<Props> = ({ track, deleteTrack, publishTrack }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const clickByTrack = async (id: string) => {
    if (user) {
      try {
        await dispatch(postTrackHistoryById(id));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="col mb-2">
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'auto',
          backgroundColor: '#f9f9f9',
          position: 'relative'
        }}
      >
        <div>
          {(!track.isPublished && (user?.role === 'admin' || user?._id === track.user._id)) && (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                padding: '6px 12px',
                borderRadius: '8px',
                zIndex: 2,
                boxShadow: '0px 2px 5px rgba(0,0,0,0.3)',
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
          <Typography variant="h6" component="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            № {track.number} - {track.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Continuance: {track.continuance}
          </Typography>
        </div>

        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <Button
              className="btn btn-primary"
              onClick={() => clickByTrack(track._id)}
              variant="contained"
              color="success"
              size="small"
              sx={{
                marginTop:'20px',
                fontSize: '14px',
                minWidth: 'auto',
                padding: '5px 12px',
                textTransform: 'none',
                boxShadow: 1,
              }}
            >
              Play
            </Button>

            {(user?.role === 'admin' || user?._id === track.user._id) && (
              <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteTrack(track._id)}
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                  }}
                >
                  Delete
                </Button>

                {!track.isPublished && user?.role === 'admin' && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => publishTrack(track._id)}
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                    }}
                  >
                    Publish
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </div>
      </Card>
    </div>
  );
};

export default TrackCard;
