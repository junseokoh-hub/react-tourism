import { lazy, Suspense, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchList } from "../../api/campingApi";
import { useObserve } from "../../hooks/useObserve";
import Loader from "../../utils/Loader.js";

const CampingSearchedContent = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 3000)).then(
    () => import("./CampingSearchedContent.js"),
  ),
);

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
        <Suspense fallback={<Loader position={"top-0"} />}>
          {data?.pages?.map((item) =>
            item?.items?.item?.map(
              (camp) =>
                camp && (
                  <CampingSearchedContent key={camp.contentId} camp={camp} />
                ),
            ),
          )}
        </Suspense>
        {isFetching && <Loader position={"top-0"} />}
        {data && data.pages[0]?.totalCount === 0 && (
          <div className="text-center">데이터가 없습니다.</div>
        )}
      </ul>
      <div ref={targetRef} />
    </>
  );
};

export default CampingInput;
