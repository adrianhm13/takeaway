import { useState, useEffect} from "react"
// import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    // const {dispatch} = useAuthContext()

    const logout = async () => {
        setError(null);
        setIsPending(true);
    
        //Logout user
        try {
          // await signOut(auth);
    
          // Dispatch logout action
          // dispatch({ type: "LOGOUT", payload: null });
    
          //Update states
          if (!isCancelled) {
            setIsPending(false);
            setError(null);
          }
        } catch (error) {
          if (!isCancelled) {
            setIsPending(false);
            setError(null);
          }
        }
      };
    
      //Cleanup function in case the async function it's active while the component it's unmounted
      useEffect(() => {
        return () => {
          setIsCancelled(true);
        };
      }, []);

    return {logout, error, isPending}
}