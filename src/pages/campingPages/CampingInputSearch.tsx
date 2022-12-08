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
      <div>
        <input
          {...register("camping_search_input")}
          type="text"
          placeholder="입력해 주세요."
        />
        <button onClick={submitHandler}>검색</button>
      </div>
      <CampingInput />
    </>
  );
};

export default CampingInputSearch;
