import Grid from '@mui/material/Grid2';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu.tsx';

const AdminLayout = () => {
  return (
    <div>
     <Grid container>
       <Grid sx={{width: 200}}>
         <AdminMenu/>
       </Grid>
       <Grid>
         <Outlet/>
       </Grid>
     </Grid>
    </div>
  );
};

export default AdminLayout;