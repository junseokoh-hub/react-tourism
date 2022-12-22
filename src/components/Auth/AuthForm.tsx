import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import SEOMeta from "../../SEOMeta.js";

type AuthType = {
  email: string;
  password: string;
  passwordConfirm?: string;
  displayName?: string;
};

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const navigate = useNavigate();
  const { isLoading, error, signup } = useSignup();
  const { isLoading: loginLoading, error: loginError, login } = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AuthType>();

  const submitHandler = handleSubmit((data) => {
    if (!isLogin) {
      if (window.confirm("회원가입을 하시겠습니까?")) {
        if (data.password !== data.passwordConfirm) {
          return setError(
            "passwordConfirm",
            {
              message: "비밀번호가 동일하지 않습니다.",
            },
            { shouldFocus: true },
          );
        } else {
          if (!isLoading) {
            signup(data.email, data.password, data.displayName as string);
          }
        }
      }
    } else {
      if (!loginLoading) {
        login(data.email, data.password);
        reset();
      }
    }
  });

  const emailValidation = {
    required: { value: true, message: "이메일을 입력해주세요" },
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[a-z]+.com$/,
      message: "이메일 형식으로 입력해주세요.",
    },
  };

  const PasswordValidation = {
    required: { value: true, message: "비밀번호를 입력해주세요" },
    pattern: {
      value:
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      message: "영문,숫자,특수기호를 포함해 8 ~ 20자리로 입력해주세요",
    },
  };

  const displayNameValidation = {
    required: { value: true, message: "닉네임을 입력해주세요." },
    maxLength: { value: 15, message: "15자 이하로 작성해주세요" },
    minLength: { value: 5, message: "5자 이상으로 작성해주세요" },
    pattern: {
      value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
      message: "한글, 영어, 숫자로만 작성해주세요",
    },
  };

  return (
    <>
      <SEOMeta
        title={isLogin ? "로그인" : "회원가입"}
        content={
          isLogin
            ? "로그인하셔서 저희 서비스를 이용해보세요"
            : "회원가입하셔서 저희 서비스를 이용해보세요"
        }
      />
      <form
        className={`mt-10 mx-auto space-y-5 w-[400px] ${
          isLogin ? "h-[450px]" : "h-[550px]"
        } flex flex-col justify-center items-center rounded-md shadow-2xl dark:text-white dark:shadow-[0px_0px_5px_rgba(255,255,255,0.5)]`}
        onSubmit={submitHandler}
      >
        <div className="w-2/3 space-y-1 flex flex-col items-center">
          <label htmlFor="email" className="place-self-start">
            이메일
          </label>
          <input
            className="pl-1 w-full h-10 border outline-none"
            id="email"
            {...register("email", emailValidation)}
          />
          <span className="text-red-500">{errors.email?.message}</span>
        </div>
        <div className="w-2/3 space-y-1 flex flex-col items-center">
          <label htmlFor="password" className="place-self-start">
            비밀번호
          </label>
          <input
            className="pl-1 w-full h-10 border outline-none"
            id="password"
            type="password"
            {...register("password", PasswordValidation)}
          />
          <span className="text-red-500 text-center">
            {errors.password?.message}
          </span>
        </div>
        {!isLogin && (
          <>
            <div className="w-2/3 space-y-1 flex flex-col items-center">
              <label htmlFor="passwordConfirm" className="place-self-start">
                비밀번호 재확인
              </label>
              <input
                className="pl-1 w-full h-10 border outline-none"
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm")}
              />
              <span className="text-red-500">
                {errors?.passwordConfirm?.message}
              </span>
            </div>
            <div className="w-2/3 space-y-1 flex flex-col items-center">
              <label htmlFor="displayName" className="place-self-start">
                닉네임
              </label>
              <input
                className="pl-1 w-full h-10 border outline-none"
                id="displayName"
                {...register("displayName", displayNameValidation)}
              />
              <span className="text-red-500">
                {errors.displayName?.message}
              </span>
            </div>
          </>
        )}
        <button
          type="submit"
          className="py-2 w-2/3 rounded-sm border-0 outline-none cursor-pointer text-lg text-white font-semibold bg-teal-500 transition-colors hover:bg-teal-800 dark:bg-orange-500 dark:hover:bg-orange-800"
          disabled={isSubmitting}
        >
          {isLogin ? "로그인" : "회원가입"}
        </button>
        {isLogin && (
          <span
            className="mt-5 block text-center text-teal-500 cursor-pointer transition-all dark:text-orange-500 dark:hover:text-orange-800"
            onClick={() => navigate("/signup")}
          >
            회원가입하기
          </span>
        )}
        {!isLogin && error && (
          <span className="text-center text-red-500">
            이미 존재하는 이메일 입니다.
          </span>
        )}
        {isLogin && loginError && (
          <span className="text-center text-red-500">
            회원 정보가 없습니다.
          </span>
        )}
      </form>
    </>
  );
};

export default AuthForm;
