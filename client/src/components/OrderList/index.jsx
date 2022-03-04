import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalAction, deleteItemAction } from "../../redux/actions/cart";

//Icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

//Style
import * as Styled from "./style";

//Components
import { List, Button, Divider, Typography } from "@mui/material";
import { ItemCart } from "./ItemCart";

export function OrderList() {
  const dispatch = useDispatch();
  const { orderList, total } = useSelector((state) => state.cart);

  // Update total cost of order
  useEffect(() => {
    dispatch(updateTotalAction());
  }, [orderList, dispatch]);

  // Delete item if quantity it's 0
  useEffect(() => {
    const deleteItem = [...orderList].find((item) => item.qty === 0);
    if (deleteItem) dispatch(deleteItemAction(deleteItem));
  }, [orderList, dispatch]);

  return (
    <List sx={Styled.ListContainer}>
      <Typography variant={"h6"} gutterBottom>
        Your order
      </Typography>
      <Divider />
      {orderList &&
        orderList.map((item) => (
          <ItemCart item={item} key={item.tempId} dispatch={dispatch} />
        ))}
      <Divider />
      <Button
        sx={{ mt: 1 }}
        startIcon={<ShoppingBasketIcon />}
        variant="contained"
      >
        Total ${total}.00
      </Button>
    </List>
  );
}
