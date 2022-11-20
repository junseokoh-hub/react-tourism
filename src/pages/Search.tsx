import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchKeyword } from "../api";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useSearchParams();
  const searchSubmitHandler = handleSubmit((data) => {
    if (data) {
      navigate(`?keyword=${data.search}`);
    } else if (!data) {
      return;
    }
  });

  const keyword = params[0].get("keyword");

  const { data, isLoading } = useQuery(
    ["search", keyword],
    () => searchKeyword(keyword as string),
    {
      enabled: !!keyword,
    },
  );

  console.log(data);

  return (
    <section>
      <form onSubmit={searchSubmitHandler} className="text-center">
        <input
          type="text"
          {...register("search")}
          className="pl-2 w-1/2 h-10 outline-none border-0 shadow-[0px_5px_10px_rgba(0,0,0,0.1)]"
        />
      </form>
      {params[0].get("keyword") && (
        <article>
          {data?.map((item) => (
            <div key={item.contentid}>{item.title}</div>
          ))}
        </article>
      )}
    </section>
  );
};

export default Search;
