import { useState, useEffect } from "react";
import { createUser } from "../api";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (formData) => {
    setIsPending(true);
    setIsCancelled(false);
    try {
      const { data } = await createUser(formData);
      console.log(data);
      if (!data.ok) {
        if (data.typeError === "validation") {
          data.errors.forEach((error) => {
            throw new Error(error.msg);
          });
        }
        if (data.typeError === "existingUser") {
          throw new Error("User already exists");
        }
      }
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      return data;
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
        return { response: { ok: false } };
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
