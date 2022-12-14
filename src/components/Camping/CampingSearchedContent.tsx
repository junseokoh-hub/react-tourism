import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchedContentType } from "../../api/campingApi";

type CampingSearchedContentProps = {
  camp: SearchedContentType;
};

const CampingSearchedContent = ({ camp }: CampingSearchedContentProps) => {
  const navigate = useNavigate();
  const params = useSearchParams();
  const keyword = params[0].get("keyword");

  // const openImageModal = useCallback(() => {
  //   if (keyword) {
  //     navigate(`?keyword=${keyword}&id=${camp.contentId}`);
  //   } else {
  //     navigate(`?keyword="지도검색"&id=${camp.contentId}`);
  //   }
  //   dispatch(onOpen());
  // }, []);

  const mapX = camp.mapX.split(".").join("");
  const mapY = camp.mapY.split(".").join("");

  return (
    <li
      key={camp.contentId}
      className="p-2 flex border border-solid border-blue-100 bg-blue-100 rounded-md select-none dark:bg-orange-500 dark:border-orange-500 dark:text-white"
      onClick={() => navigate(`/camping/detail/${mapX}/${mapY}`)}
    >
      <img
        src={camp.firstImageUrl || "../images/noImage.jpg"}
        alt={camp.facltNm}
        className="w-1/3 h-1/2 block"
        // onDoubleClick={openImageModal}
      />
      <ul className="px-2 w-full flex flex-col justify-between relative">
        <li>이름 : {camp.facltNm}</li>
        <li>주소 : {camp.addr1 || camp.addr2 || ""}</li>
        <li>
          <a
            className="block dark:text-white"
            href={camp.homepage}
            target="_blank"
            rel="noopner noreferrer"
          >
            홈페이지 링크
          </a>
        </li>
        <li>전화번호 : {camp.tel}</li>
      </ul>
    </li>
  );
};

export default React.memo(CampingSearchedContent);
