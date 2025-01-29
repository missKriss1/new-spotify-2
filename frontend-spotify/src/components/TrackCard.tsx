import { Track } from '../types';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/userSlice.ts';
import { postTrackHistoryById } from '../features/trackHistories/trackHistoruThunk.ts';
import { Box, Typography } from '@mui/material';

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({ track }) => {
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
      <div
        className="d-flex align-items-center border border-black mb-2 rounded-4 text-black text-decoration-none p-3"
        style={{ position: 'relative' }}
      >
        <div className="text-start">
          <h5>
            № {track.number} - {track.title}
          </h5>
          <p className="opacity-75 text-end mb-0">Continuance: {track.continuance}</p>
          <button className="btn btn-primary" onClick={() => clickByTrack(track._id)}>
            Play
          </button>

          {user?._id === track.user._id && !track.isPublished && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(255, 0, 0, 0.9)',
                padding: '6px 16px',
                borderRadius: '8px',
                textAlign: 'center',
                zIndex: 1,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                }}
              >
                Unpublished
              </Typography>
            </Box>
          )}

          {!track.isPublished && user?.role === 'admin' && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(255, 0, 0, 0.9)',
                padding: '6px 16px',
                borderRadius: '8px',
                textAlign: 'center',
                zIndex: 1,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                }}
              >
                Unpublished
              </Typography>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
