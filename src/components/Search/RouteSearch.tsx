import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routeList } from "../../api/routeApi";
import Loader from "../../utils/Loader";

const RouteSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const params = useSearchParams();
  const keyword = params[0].get("keyword");

  const queryClient = useQueryClient();

  const {
    isLoading,
    isFetching,
    data: routes,
  } = useQuery(
    ["search-route", keyword, currentPage],
    () => {
      if (keyword) {
        return routeList(currentPage, keyword);
      }
    },
    { keepPreviousData: true },
  );

  const maxPage = Math.ceil((routes?.totalCount as number) / 20);

  useEffect(() => {
    if (maxPage) {
      if (currentPage < maxPage) {
        const nextPage = currentPage + 1;
        queryClient.prefetchQuery(["search-route", keyword, nextPage], () => {
          if (keyword) {
            return routeList(nextPage, keyword);
          }
        });
      }
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (keyword) {
      setCurrentPage(1);
    }
  }, [currentPage, keyword]);

  return (
    <div className="space-y-8 dark:text-white">
      <div className="space-y-4 min-h-screen">
        {isLoading || isFetching ? (
          <Loader position={"top-0"} />
        ) : routes && routes.totalCount !== 0 ? (
          routes.items.item.map((route) => (
            <div
              className="p-2 space-y-2 border border-dashed rounded-md cursor-pointer hover:bg-gray-600 hover:text-white transition-colors dark:border-white"
              key={route.routeIdx}
              onClick={() => navigate(`/route/${route.routeIdx}`)}
            >
              <h3>{route.themeNm}</h3>
              <p>{route.linemsg}</p>
            </div>
          ))
        ) : (
          <div className="text-center font-bold dark:text-white">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
      <div className="space-x-10 flex justify-center items-center">
        <button
          className="py-2 px-3 bg-transparent text-teal-500 border border-solid border-teal-500 rounded-md cursor-pointer hover:text-white hover:bg-teal-500 transition-colors dark:text-white dark:border-orange-500 dark:hover:bg-orange-500"
          disabled={currentPage <= 1 || !routes || routes.totalCount === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          prev
        </button>
        <span className="text-teal-500 font-bold text-lg dark:text-orange-500">
          {currentPage}
        </span>
        <button
          className="py-2 px-3 bg-transparent text-teal-500 border border-solid border-teal-500 rounded-md cursor-pointer hover:text-white hover:bg-teal-500 transition-colors dark:text-white dark:border-orange-500 dark:hover:bg-orange-500"
          disabled={
            currentPage === maxPage || !routes || routes.totalCount === 0
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default RouteSearch;
