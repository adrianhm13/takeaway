import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteProduct, updateTotalOrder } from "../../features/cart/cartSlice";

//Icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

//Style
import * as Styled from "./style";

//Components
import { List, Button, Divider, Typography } from "@mui/material";
import { ItemCart } from "./ItemCart";

export function OrderList() {
  const { orderList, orderTotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // Update total cost of order
  useEffect(() => {
    dispatch(updateTotalOrder());
  }, [orderList, dispatch]);

  // Delete item if quantity it's 0
  useEffect(() => {
    const deleteItem = orderList.find((item) => item.qty === 0);
    if (deleteItem) {
      dispatch(deleteProduct(deleteItem.tempId));
    }
  }, [orderList, dispatch]);

  return (
    <List sx={Styled.ListContainer}>
      <Divider />
      <Typography variant={"h6"} py={1}>
        Your order
      </Typography>
      <Divider />
      {orderList &&
        orderList.map((item) => <ItemCart item={item} key={item.tempId} />)}
      <Button
        sx={{ mt: 1 }}
        startIcon={<ShoppingBasketIcon />}
        variant="contained"
      >
        Total ${orderTotal}.00
      </Button>
    </List>
  );
}
