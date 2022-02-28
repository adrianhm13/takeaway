import { useState, useEffect } from "react";
import { createUser } from "../api";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (formData) => {
    setError(null);
    setIsPending(true);
    try {
      const { data } = await createUser(formData);
      if (!data.ok) {
        data.errors.forEach((error) => {
          throw new Error(error.msg);
        });
      }
    } catch (error) {
      setError(error.message);
      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
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
