import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

// Components
import { Box, IconButton, Menu, Button, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Styles
import * as Styled from "./style";

type NavMenuPhoneProps = {
  handleOpenNavMenu: React.MouseEventHandler<HTMLButtonElement>,
  anchorElNav: HTMLElement | null
  onAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
}

export default function NavMenuPhone({
  handleOpenNavMenu,
  anchorElNav,
  onAnchorElNav,
}: NavMenuPhoneProps) {
  return (
    <Box sx={Styled.NavMenuPhone}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e) => handleOpenNavMenu(e)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElNav)}
        onClose={() => onAnchorElNav(null)}
        sx={Styled.MenuContent}
      >
        <MenuItem onClick={() => onAnchorElNav(null)}>
          <Button component={RouterLink} exact to="/">
            Home
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onAnchorElNav(null)}>
          <Button component={RouterLink} exact to="/menu">
            Menu
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
}
