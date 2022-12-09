import { useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchList } from "../../api/campingApi";
import { useObserve } from "../../hooks/useObserve";
import { useDispatch, useSelector } from "../../store/hooks";
import { onClose } from "../../store/slices/menuSlice";
import Loader from "../../utils/Loader";
import Modal from "../Modal/Modal";
import CampingImages from "./CampingImages";
import CampingSearchedContent from "./CampingSearchedContent";

const CampingInput = () => {
  const { targetRef, isView } = useObserve();
  const params = useSearchParams();
  const keyword = params[0].get("keyword");
  const contentId = params[0].get("id");
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

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

  const closeModal = useCallback(() => {
    dispatch(onClose());
  }, []);

  return (
    <>
      {isMenuOpen && contentId && (
        <Modal closeModal={closeModal}>
          <CampingImages isMenuOpen={isMenuOpen} contentId={contentId} />
        </Modal>
      )}
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
