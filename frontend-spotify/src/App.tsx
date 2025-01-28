import { Container, CssBaseline } from '@mui/material';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home.tsx';
import Albums from './containers/Albums/Albums.tsx';
import Tracks from './containers/Tracks/Tracks.tsx';
import RegisterUser from './features/users/RegisterUser.tsx';
import LoginUser from './features/users/LoginUser.tsx';
import TrackHistories from './containers/TrackHistories/TrackHistories.tsx';
import ArtistsForm from './containers/Atists/ArtistsForm.tsx';

const App = () => {
  return(
    <>
      <CssBaseline/>
      <header>
        <AppToolBar/>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path = '/register' element={<RegisterUser/>}/>
            <Route path = '/login' element={<LoginUser/>}/>
            <Route path="/albums" element={<Albums />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track_history" element={<TrackHistories />} />
            <Route path="/add_new_artist" element={<ArtistsForm />} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
