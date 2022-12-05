import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const searchSubmitHandler = handleSubmit((data) => {
    if (data) {
      navigate(`?keyword=${data.search}`);
    } else if (!data) return;
  });

  const searchValidation = {
    required: { value: true, message: "단어를 입력해 주세요." },
    pattern: {
      value: /^[ㄱ-ㅎ|가-힣]+$/,
      message: "영어 및 공백은 불가능 합니다.",
    },
  };

  return (
    <form onSubmit={searchSubmitHandler} className="px-6 py-2 text-center">
      <input
        type="text"
        placeholder="입력해 주세요!"
        {...register("search", searchValidation)}
        className="px-2 w-full h-14 outline-none border-0 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] dark:bg-black dark:placeholder:text-white dark:text-white dark:shadow-[rgba(255,255,255,0.4)] "
      />
    </form>
  );
};

export default React.memo(SearchBox);
