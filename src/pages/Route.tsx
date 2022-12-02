import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { routeList } from "../api/routeApi";
import Loader from "../utils/Loader";

const Route = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  const {
    data: routes,
    isLoading,
    isFetching,
  } = useQuery(["route", currentPage], () => routeList(String(currentPage)), {
    keepPreviousData: true,
  });

  const maxPage = Math.ceil(routes?.totalCount / routes?.numOfRows);

  console.log(routes);

  useEffect(() => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["route", nextPage], () =>
        routeList(String(nextPage)),
      );
    }
  }, [currentPage, queryClient]);

  return (
    <div className="space-y-10">
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        routes?.items.item.map((route: any) => (
          <div
            key={route.linemsg}
            dangerouslySetInnerHTML={{ __html: route.themedescs }}
          ></div>
        ))
      )}
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        prev
      </button>
      <button
        disabled={currentPage >= maxPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Route;
