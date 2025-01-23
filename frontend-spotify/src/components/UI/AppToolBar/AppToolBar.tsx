import { AppBar, Container, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from "react-router-dom";
import { useAppSelector } from '../../../app/hooks.ts';
import AnonimysMenu from './AnonimysMenu.tsx';
import { selectUser } from '../../../features/users/userSlice.ts';
import UserMenu from './UserMenu.tsx';


const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser)
  return (
    <div>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Container>
          <Toolbar>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Spotify</Link>
            </Typography>
            {user ? (
              <UserMenu user={user}/>
            ):(
              <AnonimysMenu/>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppToolBar;