
import { useState } from 'react';
import { RegisterMutation } from '../../types';
import { Alert, Avatar, Box, Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './userSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from './userThunk.ts';

const LoginUser = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();


  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
  })

  const inpytChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
      await dispatch(login(form)).unwrap()
      navigate('/');
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError && (
            <Alert severity='error' sx={{mt:3 , width: '100%'}}>
              {loginError.error}
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container direction={'column'} spacing={2}>
              <Grid  size ={12}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={inpytChangeHandler}
                />
              </Grid>
              <Grid  size ={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={inpytChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <NavLink to='/register'>
                  No account yet? Sign Up
                </NavLink>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginUser;