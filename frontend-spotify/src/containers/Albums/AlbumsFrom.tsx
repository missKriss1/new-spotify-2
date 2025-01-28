import React, { useEffect, useState } from 'react';
import { IAlbumMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreatingError, selectCreatingLoading } from '../../features/albums/albumsSlice.ts';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';
import { addAlbum } from '../../features/albums/albumsThunlk.ts';
import FileInput from '../../components/FileInput.tsx';
import { selectArtists } from '../../features/artists/artistsSlice.ts';
import { fetchArtists } from '../../features/artists/artistsThunk.ts';

const initialState = {
  title: '',
  image: null,
  date: '',
  artist: '',
};

const AlbumsFrom = () => {
  const [form, setForm] = useState<IAlbumMutation>({ ...initialState });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectArtists);
  console.log(artists);
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectCreatingLoading);
  const creatingError  = useAppSelector(selectCreatingError);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (!user) navigate("/register");
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()

    try{
      await dispatch(addAlbum(form)).unwrap();
      setForm({...initialState});
      navigate(`/albums?artist=${form.artist}`)

    }catch (e){
      console.error(e);
    }
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState: IAlbumMutation) => ({ ...prevState, [name]: value }));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: IAlbumMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
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
        <h3 className="text-center mb-5 mt-2">New album</h3>

        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={onInputChange}
              className={`form-control ${getFieldError("title") ? "is-invalid" : ""}`}
            />
            <label htmlFor="title">Title</label>
            {getFieldError("title") && (
              <div className="invalid-feedback">{getFieldError("title")}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              name="date"
              id="date"
              min='0'
              value={form.date}
              onChange={onInputChange}
              className={`form-control ${getFieldError("date") ? "is-invalid" : ""}`}
            />
            <label htmlFor="date">Date</label>
            {getFieldError("date") && (
              <div className="invalid-feedback">
                {getFieldError("date")}
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
            <FileInput
              id="image"
              name="image"
              label="Изображение"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control ${getFieldError("image") ? "is-invalid" : ""}`}
            />

            {getFieldError("image") && (
              <div className="invalid-feedback">{getFieldError("image")}</div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Add new album"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlbumsFrom;