import { OrderProduct } from "../cart/cartSlice";


export interface Product {
  _id: string;
  description: string;
  options: string[];
  title: string;
  price: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  address: {
    street: string;
    town: string;
    zipCode: string;
  };
  email: string;
  phone: string;
  orders: OrderProduct[];
  isAdmin: boolean;
  password: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
