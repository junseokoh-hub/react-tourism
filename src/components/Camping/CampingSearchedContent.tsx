import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchedContentType } from "../../api/campingApi";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useDispatch, useSelector } from "../../store/hooks";
import { onOpen } from "../../store/slices/menuSlice";

type CampingSearchedContentProps = {
  camp: SearchedContentType;
};

const CampingSearchedContent = ({ camp }: CampingSearchedContentProps) => {
  const [isPreferred, setIsPreferred] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const params = useSearchParams();
  const keyword = params[0].get("keyword");
  const { addDocument, deleteDocument } = useFirestore("preference_camping");
  const { documents } = useCollection("preference_camping", authUser?.uid);

  const openImageModal = useCallback(() => {
    if (keyword) {
      navigate(`?keyword=${keyword}&id=${camp.contentId}`);
    } else {
      navigate(`?keyword="지도검색"&id=${camp.contentId}`);
    }
    dispatch(onOpen());
  }, []);

  const lists =
    documents && documents.filter((doc) => doc.contentId === camp.contentId);

  const switchLikeHandler = useCallback(() => {
    if (authUser && lists) {
      if (lists.length === 0) {
        addDocument({
          contentId: camp.contentId,
          uid: authUser.uid,
          title: camp.facltNm,
          addr: camp.addr1 || camp.addr2 || "",
        });
        setIsPreferred(true);
      } else {
        deleteDocument(lists[0].id);
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
  }, [lists]);

  useEffect(() => {
    if (lists && lists.length > 0) {
      setIsPreferred(true);
    } else {
      setIsPreferred(false);
    }
  }, [documents]);

  return (
    <li
      key={camp.contentId}
      className="p-2 flex border border-solid border-blue-100 bg-blue-100 rounded-md select-none dark:bg-orange-500 dark:border-orange-500 dark:text-white"
    >
      <img
        src={camp.firstImageUrl || "../images/noImage.jpg"}
        alt={camp.facltNm}
        className="w-1/3 h-1/2 block"
        onClick={openImageModal}
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
        <li className="absolute right-0 bottom-0" onClick={switchLikeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${isPreferred ? "fill-red-500" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </li>
      </ul>
    </li>
  );
};

export default React.memo(CampingSearchedContent);
