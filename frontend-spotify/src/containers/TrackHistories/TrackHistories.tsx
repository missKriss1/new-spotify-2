import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTrackHistory, selectTrackHistoryLoading } from '../../features/trackHistories/trackHistorySlice.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import TrackHistoryCard from '../../components/TrackHistoryCard.tsx';
import { selectUser } from '../../features/users/userSlice.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allTrackHistory } from '../../features/trackHistories/trackHistoruThunk.ts';
import { Typography } from '@mui/material';

const TrackHistories = () => {
  const loadingTrackHistory = useAppSelector(selectTrackHistoryLoading);
  const trackHistory = useAppSelector(selectTrackHistory);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(allTrackHistory());
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      {loadingTrackHistory ? (
        <Spinner />
      ) : (
        <>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Track History
          </Typography>
          <hr />
          {trackHistory.length === 0 ? (
            <Typography >
              No track in Track History
            </Typography>
          ):(
            <>
              {trackHistory.map((track) => (
                <TrackHistoryCard key={track._id} trackHistory={track} />
              ))}
            </>
          )}дф
        </>
      )}
    </>
  );
};

export default TrackHistories;
