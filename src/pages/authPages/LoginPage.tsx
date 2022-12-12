import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import SEOMeta from "../../SEOMeta";
import { AuthType } from "./SignupPage";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AuthType>();

  const { isLoading, error, login } = useLogin();

  const submitHandler = handleSubmit((data) => {
    login(data.email, data.password);
    if (!isLoading && !error) {
      reset();
    }
  });

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <SEOMeta title="로그인" content="로그인하기" />
      <form
        className="mt-20 mx-auto space-y-6 w-80 h-96 flex flex-col justify-center items-center rounded-md shadow-2xl dark:text-white dark:shadow-[0px_0px_5px_rgba(255,255,255,0.5)]"
        onSubmit={submitHandler}
      >
        <div className="space-y-1">
          <label className="block" htmlFor="email">
            이메일
          </label>
          <input
            className="pl-1 w-48 h-10 border outline-none"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="space-y-1">
          <label className="block" htmlFor="password">
            비밀번호
          </label>
          <input
            className="pl-1 w-48 h-10 border outline-none"
            id="password"
            type="password"
            {...register("password")}
          />
        </div>
        <button
          type="submit"
          className="py-2 w-48 rounded-sm text-lg text-white font-semibold border-0 outline-none cursor-pointer transition-colors bg-teal-500 hover:bg-teal-800 dark:bg-orange-500 dark:hover:bg-orange-800"
          disabled={isSubmitting}
        >
          로그인
        </button>
        <span
          className="mt-5 block text-center text-teal-500 cursor-pointer transition-all dark:text-orange-500 dark:hover:text-orange-800"
          onClick={() => navigate("/signup")}
        >
          회원가입하기
        </span>
      </form>
    </>
  );
};

export default LoginPage;
