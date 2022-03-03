import { useEffect, useState } from "react";
import { loginUser } from "../api";
import { AUTH } from "../constants/actionTypes";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const dispatch = useDispatch();

  const login = async (user) => {
    setError(null);
    setIsPending(true);
    setIsCancelled(false);
    try {
      const { data } = await loginUser(user);
      if (data.user) {
        dispatch({ type: AUTH, data });

        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (!isCancelled) {
        const { errorMessage } = error.response.data;
        setIsPending(false);
        setError(errorMessage);
      }
    }
  };
  //Cleanup function in case the async function it's active while the component it's unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, login, isPending };
};
