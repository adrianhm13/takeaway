import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";

import NavMenuPhone from "./NavMenuPhone";
import SettingsUserMenu from "./SettingsUserMenu";
import NavMenuPages from "./NavMenuDesktop";
import LogoPhone from "./LogoPhone";
import LogoDesktop from "./LogoDesktop";
import SignInMenu from "./SignInMenu";
import { AppBar, Toolbar, Container } from "@mui/material";
import { logoutAction } from "../../redux/actions/auth";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const authData = useSelector((state) => {
    console.log('State:', state);
    return state.auth.authData;
  });
  console.log(authData);

  // useEffect to set the user with the info hosted in the localStorage, authData from
  // redux so when it changes the function triggers again
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("profile")));
  }, [authData]);

  const logout = () => {
    dispatch(logoutAction());
    setUserData(null);
  };

  // useEffect(() => {
  //   const token = userData?.token;
  //   //JWT
  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }
  // }, [userData.token, dispatch,]);

  const handleOpenNavMenu = (e) => {
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
          {userData && (
            <SettingsUserMenu user={userData.user} logout={logout} />
          )}
          {!userData && <SignInMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
