// Components
import Typography from "@mui/material/Typography";

// Styles
import * as Styled from './style'

export default function LogoPhone() {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={Styled.Logo}
    >
      LOGO
    </Typography>
  );
}
