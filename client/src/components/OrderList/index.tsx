import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteProduct, updateTotalOrder } from "../../features/cart/cartSlice";

//Icons

//Style
import * as Styled from "./style";

//Components
import {
  List,
  Divider,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import { ItemCart } from "./ItemCart";
import { CreateOrder } from "./CreateOrder";

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
      {/* Payments Types and Delivery Type */}
      <Box my={2}>
        <FormControl>
          <FormLabel id="payment">Payment</FormLabel>
          <RadioGroup
            row
            aria-labelledby="payment"
            defaultValue={"Card"}
            name="radio-buttons-payment"
          >
            <FormControlLabel value={"Card"} control={<Radio />} label="Card" />
            <FormControlLabel value={"Cash"} control={<Radio />} label="Cash" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="delivery">Delivery</FormLabel>
          <RadioGroup
            row
            aria-labelledby="delivery"
            defaultValue={"Card"}
            name="radio-buttons-delivery"
          >
            <FormControlLabel
              value={"Pickup"}
              control={<Radio />}
              label="Pickup"
            />
            <FormControlLabel
              value={"Delivery"}
              control={<Radio />}
              label="Delivery"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <CreateOrder orderTotal={orderTotal} orderList={orderList} />
    </List>
  );
}
