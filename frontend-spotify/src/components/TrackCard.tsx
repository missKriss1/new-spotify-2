import { Track } from '../types';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/userSlice.ts';
import { postTrackHistoryById } from '../features/trackHistories/trackHistoruThunk.ts';


interface Props {
  track: Track;
}
const TrackCard: React.FC <Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const clickByTrack = async (id:string) =>{
    if(user){
      try{
        await dispatch(postTrackHistoryById(id))
      }catch(e){
        console.log(e);
      }
    }
  }
  return (
      <div className="col mb-2">
        <div
          className="d-flex align-items-center border border-black mb-2 rounded-4 text-black text-decoration-none p-3">
          <div className="text-start">
            <h5>
                № {track.number} - {track.title}
            </h5>
            <p className="opacity-75 text-end mb-0">Continuance: {track.continuance}</p>
            <button className='btn btn-primary' onClick={() => clickByTrack(track._id)}>
              Play
            </button>
          </div>
        </div>
      </div>
  );
};

      export default TrackCard;