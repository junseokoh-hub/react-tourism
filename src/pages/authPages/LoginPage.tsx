import { useEffect } from "react";
import AuthForm from "../../components/Auth/AuthForm.js";

const LoginPage = () => {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return <AuthForm isLogin={true} />;
};

export default LoginPage;
