import React, { useEffect, useState } from 'react';
import { ITrackMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchArtists } from '../../features/artists/artistsThunk.ts';
import {  albumsByArtists } from '../../features/albums/albumsThunlk.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/users/userSlice.ts';
import { addTracks } from '../../features/tracks/tracksThunk.ts';
import { selectCreatingError, selectCreatingLoading } from '../../features/tracks/tracksSlice.ts';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';
import { selectArtists } from '../../features/artists/artistsSlice.ts';
import { selectAlbum } from '../../features/albums/albumsSlice.ts';


const initialState = {
  title: '',
  album: '',
  artist: '',
  continuance: '',
  number: 1
};

const TracksFrom = () => {
  const [form, setForm] = useState<ITrackMutation>({ ...initialState });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isCreating = useAppSelector(selectCreatingLoading);
  const creatingError  = useAppSelector(selectCreatingError);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbum)

  useEffect(() => {
    dispatch(fetchArtists());

    if(form.artist !== ''){
      dispatch(albumsByArtists(form.artist));
    }

  }, [dispatch, form.artist]);

  useEffect(() => {
    if (!user) navigate("/register");
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()

    try{
      await dispatch(addTracks(form)).unwrap();
      setForm({...initialState});
      navigate(`/tracks?album=${form.album}`)

    }catch (e){
      console.error(e);
    }
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState: ITrackMutation) => ({ ...prevState, [name]: value }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return creatingError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <div>
      <div
        style={{maxWidth: "500px"}}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">New track</h3>

        <form onSubmit={onFormSubmit}>
          <label htmlFor="title">Title</label>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={onInputChange}
              className={`form-control ${getFieldError('title') ? 'is-invalid' : ''}`}
            />
            {getFieldError('title') && (
              <div className="invalid-feedback">{getFieldError('title')}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="continuance">Continuance</label>
            <textarea
              name="continuance"
              id="continuance"
              value={form.continuance}
              onChange={onInputChange}
              className={`form-control ${getFieldError('continuance') ? 'is-invalid' : ''}`}
            />
            {getFieldError('continuance') && (
              <div className="invalid-feedback">
                {getFieldError('continuance')}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="artist">Artist</label>
            <select
              name="artist"
              id="artist"
              value={form.artist}
              onChange={onInputChange}
              className={`form-control ${getFieldError('artist') ? 'is-invalid' : ''}`}
            >
              <option value="">Select an artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
            {getFieldError('artist') && (
              <div className="invalid-feedback">{getFieldError('artist')}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="artist">Album</label>
            <select
              name="album"
              id="album"
              value={form.album}
              onChange={onInputChange}
              className={`form-control ${getFieldError('album') ? 'is-invalid' : ''}`}
            >
              <option value="">Select an album</option>
              {albums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.title}
                </option>
              ))}
            </select>
            {getFieldError('album') && (
              <div className="invalid-feedback">{getFieldError('album')}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="number"
              id="number"
              min={1}
              value={form.number}
              onChange={onInputChange}
              className={`form-control ${getFieldError('number') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="number">Number</label>
            {getFieldError('number') && (
              <div className="invalid-feedback">
                {getFieldError('number')}
              </div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Add new track"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TracksFrom;