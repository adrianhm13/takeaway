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
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.authData);

  console.log(userData);
  console.log(user);

  useEffect(() => {
    // const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [userData]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
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
          {user && <SettingsUserMenu user={user} logout={logout} />}
          {!user && <SignInMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
