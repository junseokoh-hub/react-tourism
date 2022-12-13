import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { routeList } from "../api/routeApi";
import SEOMeta from "../SEOMeta";
import Loader from "../utils/Loader";

const Route = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: routes,
    isLoading,
    isFetching,
  } = useQuery(["route", currentPage], () => routeList(currentPage), {
    keepPreviousData: true,
  });

  const maxPage = Math.ceil((routes?.totalCount as number) / 20);

  useEffect(() => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["route", nextPage], () => routeList(nextPage));
    }
  }, [currentPage, queryClient]);

  return (
    <>
      <SEOMeta title={"길 & 코스"} content={"여행 중 가고 싶은 길은?"} />
      <div className="space-y-8 dark:text-white">
        <div className="space-y-4 min-h-screen">
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            routes?.items.item.map((route) => (
              <div
                className="p-2 space-y-2 border border-dashed rounded-md cursor-pointer hover:bg-gray-600 hover:text-white transition-colors dark:border-white"
                key={route.routeIdx}
                onClick={() => navigate(`${route.routeIdx}`)}
              >
                <h3>{route.themeNm}</h3>
                <p>{route.linemsg}</p>
              </div>
            ))
          )}
        </div>
        <div className="space-x-10 flex justify-center items-center">
          <button
            className="py-2 px-3 bg-white text-teal-500 border border-solid border-teal-500 rounded-md cursor-pointer hover:text-white hover:bg-teal-500 transition-colors dark:bg-teal-500 dark:text-white dark:hover:bg-teal-800 dark:hover:border-teal-800"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            prev
          </button>
          <span className="text-teal-700 font-bold text-lg">{currentPage}</span>
          <button
            className="py-2 px-3 bg-white text-teal-500 border border-solid border-teal-500 rounded-md cursor-pointer hover:text-white hover:bg-teal-500 transition-colors dark:bg-teal-500 dark:text-white dark:hover:bg-teal-800 dark:hover:border-teal-800"
            disabled={currentPage === maxPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default Route;
