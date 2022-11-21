import { useCallback } from "react";
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

  const searchValidation = {
    required: { value: true, message: "단어를 입력해 주세요." },
    pattern: {
      value: /^[ㄱ-ㅎ|가-힣]+$/,
      message: "영어 및 공백은 불가능 합니다.",
    },
  };

  console.log(data);

  const navigationHandler = useCallback(
    (contentId: string, contentTypeId: string) => {
      switch (contentTypeId) {
        case "32":
          navigate(`/accommodation/${contentId}/32`);
          break;
        case "15":
          navigate(`/festival/${contentId}/15`);
          break;
        case "39":
          navigate(`/restaurant/${contentId}/39`);
          break;
        case "38":
          navigate(`/shopping/${contentId}/38`);
          break;
        case "14":
          navigate(`/cultural-facilities/${contentId}/14`);
          break;
        case "28":
          navigate(`/leisure-sports/${contentId}/28`);
          break;
        case "12":
          navigate(`/tourist-destination/${contentId}/12`);
          break;
        default:
          return;
      }
    },
    [],
  );

  return (
    <section>
      <form onSubmit={searchSubmitHandler} className="text-center">
        <input
          type="text"
          placeholder="입력해 주세요!"
          {...register("search", searchValidation)}
          className="pl-2 w-1/2 h-10 outline-none border-0 shadow-[0px_5px_10px_rgba(0,0,0,0.1)]"
        />
      </form>
      {params[0].get("keyword") && (
        <article className="mt-10 md:grid md:grid-cols-2 md:gap-2">
          {data?.map((item) => (
            <div
              className="text-center cursor-pointer"
              key={item.contentid}
              onClick={() =>
                navigationHandler(item.contentid, item.contenttypeid)
              }
            >
              <img
                className="w-full h-80"
                src={
                  item.firstimage || item.firstimage2 || "../images/noImage.jpg"
                }
                alt={item.title}
              />
              <h3>{item.title}</h3>
            </div>
          ))}
        </article>
      )}
    </section>
  );
};

export default Search;
