import { Drawer } from "@mui/material";
import * as Styled from "./style";
import { OrderList } from "../../../components/OrderList";
import Address from "../../../components/AddressCart";

export function DrawerDesktop() {
  return (
    <Drawer variant="permanent" anchor="right" sx={Styled.Drawer}>
      <OrderList />
      <Address />
    </Drawer>
  );
}
