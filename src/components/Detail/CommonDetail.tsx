import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import { DetailCommonType } from "../../types/DetailType";
import KakaoMap from "../../utils/KakaoMap";

type CommonDetailProps = {
  data: DetailCommonType | undefined;
  contentType: string;
};

const CommonDetail = ({ data, contentType }: CommonDetailProps) => {
  const [isPreferred, setIsPreferred] = useState(false);
  const authUser = useSelector((state) => state.auth.user);
  const { contentId, contentTypeId } = useParams();
  const navigate = useNavigate();
  const { addDocument, deleteDocument } = useFirestore("preference");
  const { documents } = useCollection("preference", authUser?.uid);

  const filtered =
    documents && documents.filter((doc) => doc.title === data?.title);
  useEffect(() => {
    if (filtered && filtered.length > 0) {
      setIsPreferred(true);
    } else {
      setIsPreferred(false);
    }
  }, [documents]);

  const switchLikeHandler = useCallback(
    (
      title: string,
      overview: string,
      image: string,
      addr: string,
      tel: string,
    ) => {
      if (authUser && filtered) {
        if (filtered.length === 0) {
          addDocument({
            title,
            overview,
            image,
            addr,
            tel,
            contentId,
            contentTypeId,
            contentType,
            uid: authUser.uid,
          });
          setIsPreferred(true);
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
    },
    [filtered],
  );

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
      <ul className="space-y-5">
        <li className="space-x-5 flex items-center">
          <h3>{data?.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-8 h-8 ${isPreferred ? "fill-red-500" : ""}`}
            onClick={() => {
              if (data) {
                switchLikeHandler(
                  data.title,
                  data.overview,
                  data.firstimage || data.firstimage2 || "",
                  data.tel,
                  data.addr1,
                );
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </li>
        <li
          className="leading-5"
          dangerouslySetInnerHTML={{
            __html: data?.overview as string,
          }}
        ></li>
        <li>
          <span>{data?.telname}</span>
          <span>{data?.tel}</span>
          <span
            dangerouslySetInnerHTML={{
              __html: data?.homepage || "#",
            }}
          />
        </li>
        <li>
          <KakaoMap
            latitude={Number(data?.mapy)}
            longitude={Number(data?.mapx)}
            infoWindow={data?.addr1 || data?.addr2 || data?.title}
          />
        </li>
      </ul>
    </>
  );
};

export default React.memo(CommonDetail);
