import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { locationBasedList } from "../../api/campingApi";
import CampingImages from "../../components/Camping/CampingImages";
import Modal from "../../components/Modal/Modal";
import SEOMeta from "../../SEOMeta";
import { useDispatch, useSelector } from "../../store/hooks";
import { onClose, onOpen } from "../../store/slices/menuSlice";
import Loader from "../../utils/Loader";

const CampingDetail = () => {
  const navigate = useNavigate();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const dispatch = useDispatch();
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

  console.log(data && data[0].contentId);

  return (
    <article>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div className="space-y-5">
          <SEOMeta
            title={"캠핑 - " + data[0].facltNm}
            content={data[0].intro}
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
                src={data[0].firstImageUrl}
                alt={data[0].facltNm}
                onDoubleClick={openImageModal}
              />
            </li>
            <li>
              <h3 className="text-center dark:text-white">{data[0].facltNm}</h3>
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
                <td className="td_layout">{data[0].operDeCl}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">운영기간</td>
                <td className="td_layout">{data[0].operPdCl}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">캠핑장 환경</td>
                <td className="td_layout">{data[0].facltDivNm}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">캠핑장 유형</td>
                <td className="td_layout">{data[0].induty}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">주소</td>
                <td className="td_layout">{data[0].addr1 || data[0].addr2}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">연락처</td>
                <td className="td_layout">{data[0].tel}</td>
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
                <td className="td_layout">{data[0].intro}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">기타부대시설</td>
                <td className="td_layout">{data[0].themaEnvrnCl || "없음"}</td>
              </tr>
              <tr>
                <td className="td_layout td_names">기타정보</td>
                <td className="td_layout">{data[0].tooltip || "없음"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </article>
  );
};

export default CampingDetail;
