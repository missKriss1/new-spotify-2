import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <Grid container>
        <Grid>
          <Typography variant="h6">Admin menu</Typography>
        </Grid>
        <Grid>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/endpoints/artists">
                <ListItemText primary="Artists"></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/endpoints/albums">
                <ListItemText primary="Albums"></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/endpoints/tracks">
                <ListItemText primary="Tracks"></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminMenu;
