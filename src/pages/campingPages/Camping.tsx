import { Suspense, useCallback, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import CampingImages from "../../components/Camping/CampingImages";
import Modal from "../../components/Modal/Modal";
import OutletIndicator from "../../components/UI/OutletIndicator";
import SEOMeta from "../../SEOMeta";
import { useDispatch, useSelector } from "../../store/hooks";
import { onClose } from "../../store/slices/menuSlice";
import Loader from "../../utils/Loader";

const Camping = () => {
  const params = useSearchParams();
  const contentId = params[0].get("id");
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(onClose());
  }, []);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  const campingIndicators = [
    {
      match: "camping/input-search",
      path: "input-search",
      title: "검색으로 찾기",
    },
    { match: "camping/map-search", path: "map-search", title: "지도로 찾기" },
  ];

  return (
    <>
      <SEOMeta
        title={"캠핑 검색"}
        content={"캠핑을 떠나고 싶으시다면 검색해보아요"}
      />
      {isMenuOpen && contentId && (
        <Modal closeModal={closeModal}>
          <CampingImages isMenuOpen={isMenuOpen} contentId={contentId} />
        </Modal>
      )}
      <section>
        <OutletIndicator indicators={campingIndicators} />
        <article className="mt-10">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </article>
      </section>
    </>
  );
};

export default Camping;
