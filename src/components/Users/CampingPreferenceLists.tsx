import { DocumentsType } from "../../hooks/useCollection";

type CampingPreferenceListsProps = {
  data: DocumentsType;
};

const CampingPreferenceLists = ({ data }: CampingPreferenceListsProps) => {
  return (
    <li
      className="space-x-2 p-2 flex border border-solid border-blue-500 cursor-pointer dark:border-orange-500 dark:text-white"
      key={data.id}
    >
      <div className="w-1/3 md:w-1/2">
        <img className="w-full h-60 block" src={data.image} alt={data.title} />
      </div>
      <div className="w-full flex flex-col justify-around">
        <h3>이름 : {data.title || "없음"}</h3>
        <h5>주소 : {data.addr || "없음"}</h5>
        <h5>전화번호 : {data.tel || "없음"}</h5>
      </div>
    </li>
  );
};

export default CampingPreferenceLists;
