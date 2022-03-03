import React, { useState } from "react";

import {
  Box,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

export default function SettingsUserMenu({ user, logout }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget); //Ref for menu's position
  };
  console.log(user);
  return (
    <Box>
      <Tooltip
        title={`Check your profile ${
          user?.firstName || user?.givenName
        }`}
      >
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user?.givenName || user?.firstName}
            src={user?.imageUrl}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        <MenuItem onClick={() => setAnchorElUser(null)}>
          <Typography textAlign="center">Account</Typography>
        </MenuItem>
        <MenuItem onClick={() => setAnchorElUser(null)}>
          <Typography textAlign="center">Orders</Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
