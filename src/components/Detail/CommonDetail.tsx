import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import { DetailCommonType } from "../../types/DetailType";
import ShareButtons from "../../utils/ShareButtons.js";

type CommonDetailProps = {
  data: DetailCommonType | undefined;
  contentType: string;
};

const CommonDetail = ({ data, contentType }: CommonDetailProps) => {
  const [isPreferred, setIsPreferred] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const authUser = useSelector((state) => state.auth.user);
  const { contentId, contentTypeId } = useParams();
  const navigate = useNavigate();
  const { addDocument, deleteDocument } = useFirestore("preference");
  const { documents } = useCollection(
    "preference",
    authUser && ["uid", "==", authUser.uid],
  );

  const filtered =
    documents && documents.filter((doc) => doc.title === data?.title);
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
            title: data.title,
            overview: data.overview,
            image: data.firstimage || data.firstimage2 || "",
            addr: data.addr1,
            tel: data.tel,
            contentId,
            contentTypeId,
            contentType,
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

  const toggleShareBtnHandler = useCallback(() => {
    setIsShared((prev) => !prev);
  }, []);

  return (
    <>
      <img
        className="mx-auto w-full h-[466px] block rounded-md"
        src={
          data?.firstimage || data?.firstimage2
            ? `https://${
                data?.firstimage.slice(7) || data?.firstimage2.slice(7)
              }`
            : "../../images/noImage.jpg"
        }
        alt={data?.title}
      />
      {isShared ? (
        <ShareButtons
          text={data?.title}
          closeShare={toggleShareBtnHandler}
          data={data}
        />
      ) : null}
      <ul className="space-y-5">
        <li className="space-x-5 flex items-center">
          <h3 className="text-base md:text-xl">{data?.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-8 h-8 ${isPreferred ? "fill-red-500" : ""}`}
            onClick={switchLikeHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 fill-purple-500"
            onClick={toggleShareBtnHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </li>
        <li
          className="leading-7"
          dangerouslySetInnerHTML={{
            __html: data?.overview as string,
          }}
        ></li>
        <li className="space-y-6 flex flex-col">
          <span>대상 : {data?.telname || "-"}</span>
          <span>연락처 : {data?.tel || "-"}</span>
          <span
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: `주소 : ${data?.homepage || "-"}`,
            }}
          />
        </li>
      </ul>
    </>
  );
};

export default React.memo(CommonDetail);
