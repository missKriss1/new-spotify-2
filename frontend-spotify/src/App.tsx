import { Container, CssBaseline } from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import Albums from "./containers/Albums/Albums.tsx";
import Tracks from "./containers/Tracks/Tracks.tsx";
import RegisterUser from "./features/users/RegisterUser.tsx";
import LoginUser from "./features/users/LoginUser.tsx";
import TrackHistories from "./containers/TrackHistories/TrackHistories.tsx";
import ArtistsForm from "./containers/Atists/ArtistsForm.tsx";
import AlbumsFrom from "./containers/Albums/AlbumsFrom.tsx";
import TracksFrom from "./containers/Tracks/TracksFrom.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { useSelector } from "react-redux";
import { selectUser } from "./features/users/userSlice.ts";
import AdminLayout from "./features/admin/AdminLayout.tsx";
import AdminArtistsList from "./features/admin/AdminArtistsList.tsx";
import AdminAlbumsList from "./features/admin/AdminAlbumsList.tsx";
import AdminTracksList from "./features/admin/AdminTracksList.tsx";

const App = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolBar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track_history" element={<TrackHistories />} />
            <Route path="/add_new_artist" element={<ArtistsForm />} />
            <Route path="/add_new_album" element={<AlbumsFrom />} />
            <Route path="/add_new_track" element={<TracksFrom />} />

            <Route
              path="/endpoints"
              element={
                <ProtectedRoute isAllowed={user && user.role === "admin"}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="artists" element={<AdminArtistsList />} />
              <Route path="albums" element={<AdminAlbumsList />} />
              <Route path="tracks" element={<AdminTracksList />} />
            </Route>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
