import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthType } from "./SignupPage";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthType>();

  const submitHandler = handleSubmit((data) => {});

  return (
    <>
      <form
        className="mt-10 mx-auto space-y-4 w-80 h-80 flex flex-col justify-center items-center border border-teal-500 shadow-sm"
        onSubmit={submitHandler}
      >
        <div className="space-y-1">
          <label className="block" htmlFor="email">
            이메일
          </label>
          <input
            className="pl-1 w-48 h-10 border"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="space-y-1">
          <label className="block" htmlFor="password">
            비밀번호
          </label>
          <input
            className="pl-1 w-48 h-10 border"
            id="password"
            {...register("password")}
          />
        </div>
        <button
          className="py-2 w-48 rounded-sm text-lg text-white font-semibold bg-teal-500 hover:bg-teal-800"
          disabled={isSubmitting}
        >
          로그인
        </button>
      </form>
      <span
        className="mt-5 block text-center cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        회원가입하기
      </span>
    </>
  );
};

export default LoginPage;
