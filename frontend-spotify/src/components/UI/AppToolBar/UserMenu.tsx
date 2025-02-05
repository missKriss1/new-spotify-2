import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import * as React from "react";
import { User } from "../../../types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import { logout } from "../../../features/users/userThunk.ts";
import { unsetUser } from "../../../features/users/userSlice.ts";
import { apiUrl } from "../../../globalConstants.ts";
import zaglushkaAvatar from "/src/assets/zaglushkaAvatar.jpg";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const avatarImage = user.avatar
    ? `${apiUrl}/${user.avatar}`
    : zaglushkaAvatar;
  const dispatch = useAppDispatch();

  const HandleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const hendelClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="inherit"
        onClick={handleClick}
        startIcon={<Avatar src={avatarImage} alt={user?.displayName} />}
      >
        Hello, {user?.displayName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={hendelClose}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MenuItem onClick={hendelClose}>
            <NavLink
              to={"/add_new_artist"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add new artist
            </NavLink>
          </MenuItem>
          <MenuItem onClick={hendelClose}>
            <NavLink
              to={"/add_new_album"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add new album
            </NavLink>
          </MenuItem>
          <MenuItem onClick={hendelClose}>
            <NavLink
              to={"/add_new_track"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add new track
            </NavLink>
          </MenuItem>
          <MenuItem onClick={hendelClose}>
            <NavLink
              to={"/track_history"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Track History
            </NavLink>
          </MenuItem>
          {user && user.role === "admin" && (
            <MenuItem onClick={hendelClose}>
              <NavLink
                to={"/endpoints"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Admin
              </NavLink>
            </MenuItem>
          )}
        </div>
      </Menu>
      <button
        type="button"
        onClick={HandleLogout}
        className="mb-2 mt-1 d-inline-block nav-link btn button-add text-primary bg-white p-2"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
