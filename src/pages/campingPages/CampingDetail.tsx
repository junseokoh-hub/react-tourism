import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { locationBasedList } from "../../api/campingApi";
import CampingImages from "../../components/Camping/CampingImages.js";
import Modal from "../../components/Modal/Modal.js";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import SEOMeta from "../../SEOMeta";
import { useDispatch, useSelector } from "../../store/hooks";
import { onClose, onOpen } from "../../store/slices/menuSlice";
import Loader from "../../utils/Loader.js";

const CampingDetail = () => {
  const [isPreferred, setIsPreferred] = useState(false);
  const navigate = useNavigate();
  const params = useSearchParams();
  const id = params[0].get("id");
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { documents } = useCollection(
    "preference_camping",
    authUser && ["uid", "==", authUser.uid],
  );
  const { addDocument, deleteDocument } = useFirestore("preference_camping");
  const { mapX, mapY } = useParams();
  const newMapX = mapX && mapX.split("");
  const newMapY = mapY && mapY.split("");
  newMapX && newMapX.splice(3, 0, ".");
  newMapY && newMapY.splice(2, 0, ".");

  const realMapX = newMapX && newMapX.join("");
  const realMapY = newMapY && newMapY.join("");

  const { data, isLoading } = useQuery(
    ["camping_detail", realMapX, realMapY],
    () => {
      if (realMapX && realMapY) {
        return locationBasedList(realMapX, realMapY, "0");
      }
    },
  );

  const contentId = data && data[0].contentId;

  const openImageModal = useCallback(() => {
    if (data) {
      navigate(`?id=${contentId}`);
      dispatch(onOpen());
    }
  }, [contentId]);

  const closeModal = useCallback(() => {
    dispatch(onClose());
  }, []);

  const filtered =
    documents &&
    data &&
    documents.filter((doc) => doc.title === data[0]?.facltNm);
  useEffect(() => {
    if (authUser) {
      if (filtered && filtered.length > 0) {
        setIsPreferred(true);
      } else {
        setIsPreferred(false);
      }
    } else {
      setIsPreferred(false);
    }
  }, [documents]);

  useEffect(() => {
    if (id) {
      dispatch(onOpen());
    } else {
      dispatch(onClose());
    }
  }, [id]);

  const switchLikeHandler = useCallback(() => {
    if (authUser && filtered) {
      if (filtered.length === 0) {
        if (data) {
          addDocument({
            title: data[0].facltNm,
            overview: data[0].intro,
            image: data[0].firstImageUrl || "../../../images/noImage.jpg",
            addr: data[0].addr1,
            tel: data[0].tel,
            contentId,
            mapX: data[0].mapX,
            mapY: data[0].mapY,
            uid: authUser.uid,
          });
          setIsPreferred(true);
        }
      } else {
        deleteDocument(filtered[0].id);
        setIsPreferred(false);
      }
    } else {
      if (
        window.confirm(
          `????????? ????????? ???????????? ??? ????????????. ????????? ???????????????????`,
        )
      ) {
        navigate("/login");
      }
    }
  }, [filtered]);

  return (
    <article>
      {isLoading ? (
        <Loader position={"top-0"} />
      ) : data ? (
        <>
          <SEOMeta
            title={"?????? - " + data[0].facltNm}
            content={data[0].intro || "???????????? ??? ??? ???????????????"}
          />

          {isMenuOpen && contentId && (
            <Modal closeModal={closeModal}>
              <CampingImages isMenuOpen={isMenuOpen} contentId={contentId} />
            </Modal>
          )}
          <div className="space-y-5">
            <ul className="space-y-5">
              <li>
                <img
                  className="w-full rounded-md"
                  src={data[0].firstImageUrl || "../../../images/noImage.jpg"}
                  alt={data[0].facltNm}
                  onDoubleClick={openImageModal}
                />
                <span className="block text-center italic text-gray-500 text-xs sm:text-sm">
                  (???????????? ??? ??? ??????????????? ?????? ???????????? ??? ??? ????????????.)
                </span>
              </li>
              <li className="flex justify-center items-center space-x-2">
                <h3 className="text-center dark:text-white">
                  {data[0].facltNm}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-8 h-8 ${
                    isPreferred ? "fill-red-500" : ""
                  } dark:text-white`}
                  onClick={switchLikeHandler}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </li>
            </ul>
            <table className="table_layout">
              <thead>
                <tr>
                  <th colSpan={2} className="th_layout">
                    ??????
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td_layout td_names">?????????</td>
                  <td className="td_layout">
                    {data[0].operDeCl || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">????????????</td>
                  <td className="td_layout">
                    {data[0].operPdCl || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">????????? ??????</td>
                  <td className="td_layout">
                    {data[0].facltDivNm || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">????????? ??????</td>
                  <td className="td_layout">
                    {data[0].induty || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">??????</td>
                  <td className="td_layout">
                    {data[0].addr1 || data[0].addr2 || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">?????????</td>
                  <td className="td_layout">
                    {data[0].tel || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">????????????</td>
                  <td className="td_layout">
                    <a
                      aria-label="???????????? ??????"
                      href={data[0].homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:text-white"
                    >
                      ??????
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">??????</td>
                  <td className="td_layout">
                    {data[0].intro || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">??????????????????</td>
                  <td className="td_layout">
                    {data[0].themaEnvrnCl || "???????????? ?????? ??????"}
                  </td>
                </tr>
                <tr>
                  <td className="td_layout td_names">????????????</td>
                  <td className="td_layout">
                    {data[0].tooltip || "???????????? ?????? ??????"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="dark:text-white">???????????? ????????????.</div>
      )}
    </article>
  );
};

export default CampingDetail;
