import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appAuth } from "../lib/firebaseConfig";
import { onLogin } from "../store/authSlice";
import { useDispatch } from "../store/hooks";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = (email: string, password: string, displayName: string) => {
    setError(null);
    setIsLoading(true);

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (!user) {
          throw new Error("회원가입에 실패하셨습니다.");
        }
        navigate("/", { replace: true });
        updateProfile(appAuth.currentUser as User, { displayName })
          .then(() => {
            dispatch(onLogin(user));
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
