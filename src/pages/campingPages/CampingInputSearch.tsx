import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CampingInput from "../../components/Camping/CampingInput";

const CampingInputSearch = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = handleSubmit((data) => {
    if (data.camping_search_input) {
      navigate(`?keyword=${data.camping_search_input}`);
    } else if (!data.camping_search_input) return;
  });

  return (
    <>
      <div className="h-10 flex justify-center">
        <input
          {...register("camping_search_input")}
          type="text"
          placeholder="입력해 주세요."
          className="px-2 py-2 w-1/2"
        />
        <button
          className="w-20 h-full block bg-blue-500 border-blue-500 rounded-sm text-white font-semibold cursor-pointer dark:border-orange-500 dark:bg-orange-500"
          onClick={submitHandler}
        >
          검색
        </button>
      </div>
      <CampingInput />
    </>
  );
};

export default CampingInputSearch;
