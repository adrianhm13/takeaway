import React, { useState } from "react";
import { useSelector } from "react-redux";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge, Button, Drawer } from "@mui/material";
import { OrderList } from "../../../components/OrderList";
import * as Styled from "./style";

export function DrawerPhone() {
  const [isOpen, setIsOpen] = useState(false);
  const { orderList } = useSelector((state) => state.cart);

  return (
    <>
      <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
        <OrderList />
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
