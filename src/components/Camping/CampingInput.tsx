import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchList } from "../../api/campingApi";
import Loader from "../../utils/Loader";

const CampingInput = () => {
  const params = useSearchParams();
  const keyword = params[0].get("keyword");

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["camping_search_input", keyword],
    ({ pageParam = 1 }) => {
      if (keyword && pageParam) {
        return searchList(keyword, pageParam);
      }
    },
    {
      enabled: !!keyword,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && allPages) {
          return lastPage.pageNo <
            Math.ceil(allPages[0]!.totalCount / allPages[0]!.numOfRows)
            ? lastPage.pageNo + 1
            : undefined;
        }
      },
    },
  );

  console.log(hasNextPage);

  return (
    <div>
      {data?.pages.map((item) =>
        item?.items.item.map((n) => <div key={n.contentId}>{n.addr1}</div>),
      )}
      {isFetching ? (
        <Loader />
      ) : hasNextPage ? (
        <button onClick={() => fetchNextPage()}>더 보기</button>
      ) : null}
    </div>
  );
};

export default CampingInput;
