import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavMenuPhone from "./NavMenuPhone";
import SettingsUserMenu from "./SettingsUserMenu";
import NavMenuPages from "./NavMenuDesktop";
import LogoPhone from "./LogoPhone";
import LogoDesktop from "./LogoDesktop";
import SignInMenu from "./SignInMenu";
import { AppBar, Toolbar, Container } from "@mui/material";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  console.log(authData);

  useEffect(() => {
    // const token = user?.token;
    //JWT
    setUserData(JSON.parse(localStorage.getItem("profile")));
  }, [authData]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUserData(null);
  };

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
          {userData && <SettingsUserMenu user={userData.user} logout={logout} />}
          {!userData && <SignInMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
