import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../lib/firebaseConfig";
import { onLogin } from "../store/slices/authSlice";
import { useDispatch } from "../store/hooks";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const login = (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(onLogin(user));
        setError(null);
        setIsLoading(false);
        if (!user) {
          throw new Error(`로그인 실패!`);
        }
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return { isLoading, error, login };
};
