import { Button, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { User } from '../../../types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props{
  user: User,
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const hendelClose = () =>{
    setAnchorEl(null);
  }

  return (
    <div>
      <Button color='inherit' onClick={handleClick}>
        Hello, {user?.username}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={hendelClose}>
        <MenuItem>
          <NavLink to={'/track_history'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Track History
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;