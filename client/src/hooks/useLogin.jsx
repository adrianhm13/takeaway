import { useEffect, useState } from "react";
// import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  // const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //Login user
      // const response = await signInWithEmailAndPassword(auth, email, password);
      // setUser(response.user)
      //Dispatch login action
      // dispatch({ type: "LOGIN", payload: response.user });

      //Update states
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        console.log(error);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { user, error, login, isPending };
};
