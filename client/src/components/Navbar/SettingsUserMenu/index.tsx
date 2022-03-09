import { useState } from "react";

// Types
import { User } from "../../../features/api/apiSlice.types";

// Components
import {
  Box,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

type SettingsUserMenuProps = {
  user: User;
  logout: () => void;
};
export default function SettingsUserMenu(props: SettingsUserMenuProps) {
  const { user, logout } = props;
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(e.currentTarget); //Ref for menu's position
  };

  return (
    <Box>
      <Tooltip title={`Check your profile ${user.firstName}`}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.firstName} src="image" />
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
