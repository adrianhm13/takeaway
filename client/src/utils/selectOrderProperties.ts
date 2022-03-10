import { OrderProduct } from "../features/cart/cartSlice.types";

type OrderProps = {
  id: OrderProduct["id"];
  options: OrderProduct["options"];
  priceTotal: OrderProduct["priceTotal"];
  qty:  OrderProduct["qty"];
};
// Pick the properties needed for creating the order
export const selectOrderProperties = (order: OrderProps) => {
  const { id, options, priceTotal, qty } = order;
  return { id, options, priceTotal, qty };
};
