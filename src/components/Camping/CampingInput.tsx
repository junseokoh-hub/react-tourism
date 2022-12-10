import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchList } from "../../api/campingApi";
import { useObserve } from "../../hooks/useObserve";
import Loader from "../../utils/Loader";
import CampingSearchedContent from "./CampingSearchedContent";

const CampingInput = () => {
  const { targetRef, isView } = useObserve();
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
        if (lastPage && allPages[0]) {
          return lastPage.pageNo <
            Math.ceil(allPages[0].totalCount / allPages[0].numOfRows)
            ? lastPage.pageNo + 1
            : undefined;
        }
      },
    },
  );

  useEffect(() => {
    if (isView && hasNextPage) {
      fetchNextPage();
    }
  }, [isView]);

  return (
    <>
      <ul className="py-10 space-y-10 dark:text-white">
        {data?.pages.map((item) =>
          item?.items.item.map((camp) => (
            <CampingSearchedContent key={camp.contentId} camp={camp} />
          )),
        )}
      </ul>
      {isFetching && <Loader />}
      <div ref={targetRef} />
    </>
  );
};

export default CampingInput;
