import { useState, useEffect } from "react";
// import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);
  // const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setError(null);
    setIsPending(true);
    try {

      // if (!response) {
      //   throw new Error("It wasn't possible to signup");
      // }


      //Dispatch login action
      // dispatch({ type: "LOGIN", payload: response.user });

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

  return { error, signup, isPending, user };
};
