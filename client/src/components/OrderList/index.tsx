import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteProduct, updateTotalOrder } from "../../features/cart/cartSlice";

// Types
import { DeliverType, PaymentType } from "../../features/cart/cartSlice.types";

// Style
import * as Styled from "./style";

// Components
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
  const [paymentType, setPaymentType] = useState<PaymentType>("Card");
  const [deliverType, setDeliverType] = useState<DeliverType>("Pickup");
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
      {orderList.length > 0 && (
        <Box my={2}>
          <FormControl>
            <FormLabel id="payment">Choose the payment</FormLabel>
            <RadioGroup
              row
              aria-labelledby="payment"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as PaymentType)}
              name="radio-buttons-payment"
            >
              <FormControlLabel
                value={"Card"}
                control={<Radio size="small" />}
                label="Card"
              />
              <FormControlLabel
                value={"Cash"}
                control={<Radio size="small" />}
                label="Cash"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="delivery">Pickup or delivery?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="delivery"
              value={deliverType}
              onChange={(e) => setDeliverType(e.target.value as DeliverType)}
              name="radio-buttons-delivery"
            >
              <FormControlLabel
                value={"Pickup"}
                control={<Radio size="small" />}
                label="Pickup"
              />
              <FormControlLabel
                value={"Delivery"}
                control={<Radio size="small" />}
                label="Delivery"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      <CreateOrder
        orderTotal={orderTotal}
        orderList={orderList}
        paymentType={paymentType}
        deliverType={deliverType}
      />
    </List>
  );
}
