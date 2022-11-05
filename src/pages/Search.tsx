import { useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const searchSubmitHandler = handleSubmit((data) => {
    if (data) {
      navigate("content");
    }
  });

  return (
    <div>
      <form onSubmit={searchSubmitHandler} className="text-center">
        <input
          type="text"
          {...register("search")}
          className="pl-2 w-1/2 h-10 outline-none border-0 shadow-[0px_5px_10px_rgba(0,0,0,0.1)]"
        />
      </form>
      <Outlet />
    </div>
  );
};

export default Search;
