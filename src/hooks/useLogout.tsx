import { signOut } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../lib/firebaseConfig";
import { onLogout } from "../store/slices/authSlice";
import { useDispatch } from "../store/hooks";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const logout = () => {
    setError(null);
    setIsLoading(true);

    signOut(appAuth)
      .then(() => {
        dispatch(onLogout());
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return { isLoading, error, logout };
};
