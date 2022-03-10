import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useCreateOrderMutation } from "../../../features/api/apiSlice";
import { useEffect, useState } from "react";
import { selectOrderProperties } from "../../../utils/selectOrderProperties";
import { clearOrder } from "../../../features/cart/cartSlice";

// Types
import {
  DeliverType,
  OrderProduct,
  PaymentType,
} from "../../../features/cart/cartSlice.types";

// Components
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Button from "@mui/material/Button";
import Notification from "../../Notification";

// Styles
import * as Styled from "./style";

type CreateOrderProps = {
  orderTotal: number;
  orderList: OrderProduct[];
  paymentType: PaymentType;
  deliverType: DeliverType;
};

export function CreateOrder({
  orderTotal,
  orderList,
  paymentType,
  deliverType,
}: CreateOrderProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [createOrder, { isSuccess, isError }] = useCreateOrderMutation();
  const [notificationText, setNotificationText] = useState<
    string | undefined
  >();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (isDisabled) return;

    const orderSanitized = orderList.map(selectOrderProperties);
    try {
      if (user && "_id" in user) {
        const response = await createOrder({
          client: user._id,
          order: orderSanitized,
          totalAmount: orderTotal,
          paymentType,
          deliverType,
        });
        console.log(response);
        dispatch(clearOrder());

        if (response && "data" in response) {
          setNotificationText(response.data);
        }
      }
    } catch (error) {
      setNotificationText(error.data.errorMessage);
    }
  };

  // Cart button disabled if no logged user or cart empty
  useEffect(() => {
    !user || orderList.length === 0
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [user, orderList]);

  return (
    <>
      {(isSuccess || isError) && <Notification message={notificationText} />}
      <Button
        disabled={isDisabled}
        sx={Styled.Button}
        startIcon={<ShoppingBasketIcon />}
        variant="contained"
        onClick={handleClick}
      >
        Total ${orderTotal}.00
      </Button>
    </>
  );
}
