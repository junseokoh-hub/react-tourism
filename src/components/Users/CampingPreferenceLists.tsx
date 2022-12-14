import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentsType } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

type CampingPreferenceListsProps = {
  title: string;
  id: string;
  image: string;
  addr: string;
  tel: string;
  mapX: string;
  mapY: string;
  deletePreference: (id: string) => void;
};

const CampingPreferenceLists = ({
  title,
  id,
  image,
  addr,
  tel,
  mapX,
  mapY,
  deletePreference,
}: CampingPreferenceListsProps) => {
  const navigate = useNavigate();
  const newMapX = mapX.split(".").join("");
  const newMapY = mapY.split(".").join("");

  return (
    <li
      className="space-x-2 p-2 flex border border-solid border-blue-500 cursor-pointer dark:border-orange-500 dark:text-white"
      key={id}
      onClick={() => navigate(`/camping/detail/${newMapX}/${newMapY}`)}
    >
      <div className="w-3/4 md:w-1/2">
        <img className="w-full h-60 block" src={image} alt={title} />
      </div>
      <div className="w-full flex flex-col justify-around">
        <h3>이름 : {title || "없음"}</h3>
        <h5>주소 : {addr || "없음"}</h5>
        <h5>전화번호 : {tel || "없음"}</h5>
        <button
          className="py-2 w-40 bg-transparent border border-solid border-blue-500 text-blue-500 font-semibold rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition-colors dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
          onClick={() => deletePreference(id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default React.memo(CampingPreferenceLists);
