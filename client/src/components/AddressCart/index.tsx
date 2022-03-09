// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Styles
import * as Styles from "./style";
import { useAppSelector } from "../../app/hooks";
import Grid from "@mui/material/Grid";

export default function Address() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;
  return (
    <Box sx={Styles.AddressContainer}>
      <Divider />
      <Typography variant={"h6"} py={1}>
        Your address
      </Typography>
      <Divider />
      <Grid container spacing={1} sx={Styles.Grid}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography
            variant={"body2"}
          >{`${user.firstName} ${user.lastName}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Town</Typography>
          <Typography variant={"body2"}>{user.address.town}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="subtitle2">Zipcode</Typography>
          <Typography variant={"body2"}>{user.address.zipCode}</Typography>
        </Grid>
        <Grid item xs={6} md={12}>
          <Typography variant="subtitle2">Street</Typography>
          <Typography variant={"body2"}>{user.address.street}</Typography>
        </Grid>
        <Grid item xs={5} md={12}>
          <Typography variant="subtitle2">Phone Number</Typography>
          <Typography variant={"body2"}>{user.phone}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
