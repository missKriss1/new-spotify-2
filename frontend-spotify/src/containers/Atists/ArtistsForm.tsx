import { IArtistMutation } from '../../types';
import React, { useEffect, useState } from 'react';
import { selectUser } from '../../features/users/userSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { addArtist } from '../../features/artists/artistsThunk.ts';
import { selectCreatingError, selectCreatingLoading } from '../../features/artists/artistsSlice.ts';
import FileInput from '../../components/FileInput.tsx';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';

const initialState = {
  name: "",
  image: null,
  information: "",
};

const ArtistsForm = () => {
  const [form, setForm] = useState<IArtistMutation>({ ...initialState });
  const dispatch = useAppDispatch();
  const creatingError = useAppSelector(selectCreatingError);
  const isCreating = useAppSelector(selectCreatingLoading)
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/register");
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()

    try{
      await dispatch(addArtist(form)).unwrap();
      setForm({...initialState});
      navigate('/')

    }catch (e){
      console.error(e);
    }
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState: IArtistMutation) => ({ ...prevState, [name]: value }));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: IArtistMutation) => ({
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
        <h3 className="text-center mb-5 mt-2">New artist</h3>

        <form onSubmit={onFormSubmit}>
          <label htmlFor="name">Name artist</label>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={onInputChange}
              className={`form-control ${getFieldError('name') ? 'is-invalid' : ''}`}
            />
            {getFieldError('name') && (
              <div className="invalid-feedback">{getFieldError('name')}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="information">Information</label>
            <textarea
              name="information"
              id="information"
              value={form.information}
              onChange={onInputChange}
              className={`form-control ${getFieldError('information') ? 'is-invalid' : ''}`}
            />
            {getFieldError('information') && (
              <div className="invalid-feedback">
                {getFieldError('information')}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="information">Photo</label>
            <FileInput
              id="image"
              name="image"
              label="Photo"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control ${getFieldError('image') ? 'is-invalid' : ''}`}
            />
            {getFieldError('image') && (
              <div className="invalid-feedback">{getFieldError('image')}</div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Add new artist"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtistsForm;