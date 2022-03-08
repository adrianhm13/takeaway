import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logout,
  deleteProfileLocal,
  getProfileLocal,
} from "../../features/auth/authSlice";
import decode from "jwt-decode";

import NavMenuPhone from "./NavMenuPhone";
import SettingsUserMenu from "./SettingsUserMenu";
import NavMenuPages from "./NavMenuDesktop";
import LogoPhone from "./LogoPhone";
import LogoDesktop from "./LogoDesktop";
import SignInMenu from "./SignInMenu";
import { AppBar, Toolbar, Container } from "@mui/material";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.user);

  // Fires when page reloads or starting app, gets the user from the localStorage
  // and add it to the store
  useEffect(() => {
    dispatch(getProfileLocal());
  }, [dispatch]);

  // Delete the user/token from the store and the profile from localStorage
  const logoutUser = () => {
    dispatch(logout());
    dispatch(deleteProfileLocal());
  };

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 0, zIndex: 1210 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDesktop />
          <NavMenuPhone
            onAnchorElNav={setAnchorElNav}
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
          />
          <LogoPhone />
          <NavMenuPages />
          {userData && <SettingsUserMenu user={userData} logout={logoutUser} />}
          {!userData && <SignInMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
