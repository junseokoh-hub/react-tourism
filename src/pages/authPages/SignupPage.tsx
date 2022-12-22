import { useEffect } from "react";
import AuthForm from "../../components/Auth/AuthForm.js";

const SignupPage = () => {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return <AuthForm isLogin={false} />;
};

export default SignupPage;
