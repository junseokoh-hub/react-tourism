import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";

export type AuthType = {
  email: string;
  password: string;
  passwordConfirm?: string;
  displayName?: string;
};

const SignupPage = () => {
  const { isLoading, error, signup } = useSignup();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<AuthType>();

  const submitHandler = handleSubmit((data) => {
    if (window.confirm("회원가입을 하시겠습니까?")) {
      if (data.password !== data.passwordConfirm) {
        return setError(
          "passwordConfirm",
          {
            message: "Password is not the same!",
          },
          { shouldFocus: true },
        );
      } else {
        if (!error && !isLoading) {
          signup(data.email, data.password, data.displayName as string);
        }
      }
    }
  });

  const displayNameValidation = {
    required: { value: true, message: "You should enter your displayName!" },
    maxLength: { value: 15, message: "Your displayName is too long!" },
    minLength: { value: 5, message: "Your displayName is too short!" },
    pattern: {
      value: /^[a-zA-Z\\d`~!@#$%^&*()-_=+]+$/,
      message: "Please enter your DisplayName",
    },
  };

  return (
    <form
      className="mt-10 mx-auto space-y-4 w-[350px] h-[500px] flex flex-col justify-center items-center border border-teal-500 shadow-sm"
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
          type="password"
          {...register("password")}
        />
      </div>
      <div className="space-y-1">
        <label className="block" htmlFor="passwordConfirm">
          비밀번호 재확인
        </label>
        <input
          className="pl-1 w-48 h-10 border"
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm")}
        />
        <span>{errors?.passwordConfirm?.message}</span>
      </div>
      <div className="space-y-1">
        <label className="block" htmlFor="displayName">
          닉네임
        </label>
        <input
          className="pl-1 w-48 h-10 border"
          id="displayName"
          {...register("displayName", displayNameValidation)}
        />
      </div>
      <button
        className="py-2 w-48 rounded-sm text-lg text-white font-semibold bg-teal-500 hover:bg-teal-800"
        disabled={isSubmitting}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupPage;
