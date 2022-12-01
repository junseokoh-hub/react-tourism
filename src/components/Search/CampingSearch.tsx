import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchList } from "../../api/campingApi";
import Loader from "../../utils/Loader";

const CampingSearch = () => {
  const params = useSearchParams();
  const keyword = params[0].get("keyword") as string;
  const { data: camps, isLoading } = useQuery(
    ["search-camping", keyword],
    () => searchList(keyword),
    {
      enabled: !!keyword,
    },
  );

  console.log(camps?.items?.item);

  return (
    <article>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="mt-10 md:grid md:grid-cols-2 md:gap-2">
          {camps?.items?.item.map((camp: any) => (
            <li key={camp.contentId} className="text-center cursor-pointer">
              <img
                src={camp.firstImageUrl || "../images/noImage.jpg"}
                alt={camp.facltNm}
                className="w-full h-80 rounded-md"
              />
              <h4>{camp.facltNm}</h4>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default CampingSearch;