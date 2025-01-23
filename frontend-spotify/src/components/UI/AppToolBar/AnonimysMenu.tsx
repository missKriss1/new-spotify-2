import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';


const AnonimysMenu = () => {
  return (
    <div>
      <Button component={NavLink} to = "/register" color = "inherit">
        Sing up
      </Button>
      <Button component={NavLink} to = "/login" color = "inherit">
        Sing in
      </Button>
    </div>
  );
};

export default AnonimysMenu;