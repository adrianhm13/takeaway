import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";

// Types
import { OrderProduct } from "../../../features/cart/cartSlice.types";

// Components
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Button from "@mui/material/Button";

// Styles
import * as Styled from "./style";

type CreateOrderProps = {
  orderTotal: number;
  orderList: OrderProduct[];
};

export function CreateOrder({ orderTotal, orderList }: CreateOrderProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    if (isDisabled) return;
  };

  // Cart button disabled if no logged user or cart empty
  useEffect(() => {
    !user || orderList.length === 0
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [user, orderList]);

  return (
    <Button
      disabled={isDisabled}
      sx={Styled.Button}
      startIcon={<ShoppingBasketIcon />}
      variant="contained"
      onClick={handleClick}
    >
      Total ${orderTotal}.00
    </Button>
  );
}
