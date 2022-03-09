import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge, Button, Drawer } from "@mui/material";
import { OrderList } from "../../../components/OrderList";
import * as Styled from "./style";
import Address from "../../../components/AddressCart";

export function DrawerPhone() {
  const [isOpen, setIsOpen] = useState(false);
  const { orderList } = useAppSelector((state) => state.cart);

  return (
    <>
      <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
        <OrderList />
        <Address />
      </Drawer>
      <Button
        variant={"contained"}
        onClick={() => setIsOpen(true)}
        sx={Styled.CartButton}
      >
        <Badge badgeContent={orderList.length} color="secondary">
          <ShoppingBasketIcon />
        </Badge>
        Cart
      </Button>
    </>
  );
}
