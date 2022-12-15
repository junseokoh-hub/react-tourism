import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchKeyword } from "../../api/tourismApi";
import Loader from "../../utils/Loader";

const DomesticSearch = () => {
  const navigate = useNavigate();
  const params = useSearchParams();
  const keyword = params[0].get("keyword");

  const { isLoading, data: doms } = useQuery(
    ["search-domestic", keyword],
    () => {
      if (keyword) {
        return searchKeyword(keyword);
      }
    },
    {
      enabled: !!keyword,
    },
  );

  console.log(doms);

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
        case "25":
          navigate(`/travel-course/${contentId}/25`);
          break;
        default:
          return;
      }
    },
    [],
  );

  return (
    <article>
      {isLoading ? (
        <Loader position={"top-0"} />
      ) : (
        <ul className="space-y-10 mt-10 md:grid md:grid-cols-2 md:gap-2">
          {doms &&
            doms.map((dom) => (
              <li
                className="text-center cursor-pointer"
                key={dom.contentid}
                onClick={() =>
                  navigationHandler(dom.contentid, dom.contenttypeid)
                }
              >
                <img
                  className="w-full h-full rounded-md"
                  src={
                    dom.firstimage || dom.firstimage2 || "../images/noImage.jpg"
                  }
                  alt={dom.title}
                />
                <h4>{dom.title}</h4>
              </li>
            ))}
        </ul>
      )}
      {doms === undefined && !isLoading && (
        <div className="text-center font-bold">검색 결과가 없습니다.</div>
      )}
    </article>
  );
};

export default DomesticSearch;
