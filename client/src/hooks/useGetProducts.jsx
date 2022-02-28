import { useEffect, useState } from "react";
import * as api from "../api/index.js";

export const useGetProducts = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const getProducts = async () => {
      try {
        const { data } = await api.fetchProducts();
        setProducts(data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };

    getProducts();
  }, []);

  return { products, isLoading, error };
};
