import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../lib/firebaseConfig";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = (email: string, password: string, displayName: string) => {
    setError(null);
    setIsLoading(true);

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (!user) {
          throw new Error("회원가입에 실패하셨습니다.");
        }
        updateProfile(user, { displayName })
          .then(() => {
            setError(null);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return { isLoading, error, signup };
};
