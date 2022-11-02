import { signOut } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../lib/firebaseConfig";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = () => {
    setError(null);
    setIsLoading(true);

    signOut(appAuth)
      .then(() => {
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(true);
      });
  };

  return { isLoading, error, logout };
};
