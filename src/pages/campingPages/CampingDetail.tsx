import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { locationBasedList } from "../../api/campingApi";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import SEOMeta from "../../SEOMeta";
import { useDispatch, useSelector } from "../../store/hooks";
import { onClose, onOpen } from "../../store/slices/menuSlice";
import Loader from "../../utils/Loader";

const Modal = React.lazy(() => import("../../components/Modal/Modal"));
const CampingImages = React.lazy(
  () => import("../../components/Camping/CampingImages"),
);

const CampingDetail = () => {
  const [isPreferred, setIsPreferred] = useState(false);
  const navigate = useNavigate();
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
    navigate(`?id=${contentId}`);
    dispatch(onOpen());
  }, []);

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
          `로그인 하셔야 이용하실 수 있습니다. 로그인 하시겠습니까?`,
        )
      ) {
        navigate("/login");
      }
    }
  }, [filtered]);

  return (
    <article>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div className="space-y-5">
          <SEOMeta
            title={"캠핑 - " + data[0].facltNm}
            content={data[0].intro || "캠핑장을 한 번 둘러보세요"}
          />
          {isMenuOpen && contentId && (
            <Modal closeModal={closeModal}>
              <CampingImages isMenuOpen={isMenuOpen} contentId={contentId} />
            </Modal>
          )}
          <ul className="space-y-5">
            <li>
              <img
                className="w-full rounded-md"
                src={data[0].firstImageUrl || "../../../images/noImage.jpg"}
                alt={data[0].facltNm}
                onDoubleClick={openImageModal}
              />
            </li>
            <li className="relative">
              <h3 className="text-center dark:text-white">{data[0].facltNm}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-8 h-8 absolute right-[10%] sm:right-[15%] md:right-[25%] -top-1 ${
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
                  정보
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td_layout td_names">영업일</td>
                <td className="td_layout">
                  {data[0].operDeCl || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">운영기간</td>
                <td className="td_layout">
                  {data[0].operPdCl || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">캠핑장 환경</td>
                <td className="td_layout">
                  {data[0].facltDivNm || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">캠핑장 유형</td>
                <td className="td_layout">
                  {data[0].induty || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">주소</td>
                <td className="td_layout">
                  {data[0].addr1 || data[0].addr2 || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">연락처</td>
                <td className="td_layout">
                  {data[0].tel || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">홈페이지</td>
                <td className="td_layout">
                  <a
                    aria-label="홈페이지 링크"
                    href={data[0].homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-white"
                  >
                    링크
                  </a>
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">소개</td>
                <td className="td_layout">
                  {data[0].intro || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">기타부대시설</td>
                <td className="td_layout">
                  {data[0].themaEnvrnCl || "홈페이지 확인 요망"}
                </td>
              </tr>
              <tr>
                <td className="td_layout td_names">기타정보</td>
                <td className="td_layout">
                  {data[0].tooltip || "홈페이지 확인 요망"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="dark:text-white">데이터가 없습니다.</div>
      )}
    </article>
  );
};

export default CampingDetail;
