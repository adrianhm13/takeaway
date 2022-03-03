import { useState, useEffect } from "react";
import { createUser } from "../api";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/actions/auth";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const signup = async (formData) => {
    setIsPending(true);
    setIsCancelled(false);
    try {
      const { data } = await createUser(formData);
      console.log(data);

      dispatch(authAction(data));

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      return data;
    } catch (error) {
      if (!isCancelled) {
        const { errorMessage } = error.response.data;
        console.log(errorMessage);
        setIsPending(false);
        setError(errorMessage);
        return { ok: false };
      }
    }
  };

  //Cleanup function in case the async function it's active while the component it's unmounted
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, signup, isPending };
};
