import { NavLink as RouterLink } from "react-router-dom";

// Components
import {Box, Button} from "@mui/material"

// Styles
import * as Styled from "./style";

export default function NavMenuDesktop() {
  return (
    <Box component="nav" sx={Styled.Nav}>
      <Button component={RouterLink} exact to="/" sx={Styled.NavLink}>
        Home
      </Button>
      <Button component={RouterLink} exact to="/menu" sx={Styled.NavLink}>
        Menu
      </Button>
    </Box>
  );
}
