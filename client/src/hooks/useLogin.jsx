import { useEffect, useState } from "react";
import { loginUser } from "../api";

export const useLogin = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const login = async (user) => {
    setError(null);
    setIsPending(true);
    setIsCancelled(false);
    try {
      const { data } = await loginUser(user);

      if (data.ok) {
        setUser(data.user);

        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
        return { ok: true };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
        return { ok: false };
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { user, error, login, isPending };
};
