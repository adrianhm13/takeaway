export interface OrderProduct {
  id: string;
  title: string;
  tempId: string;
  price: number;
  priceTotal: number;
  qty: number;
  options: string[];
}
export interface CartState {
  orderList: OrderProduct[];
  orderTotal: number;
}
