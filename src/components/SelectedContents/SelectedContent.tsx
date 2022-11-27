import { useNavigate } from "react-router-dom";
import { AreaBasedListType } from "../../types/DetailType";
import Loader from "../../utils/Loader";

export type ProvinceType = {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  benikia: string;
  goodstay: string;
  hanok: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  readcount: number;
  sigungucode: string;
  tel: string;
  title: string;
};

type SelectedContentProps = {
  data: ProvinceType | AreaBasedListType;
};

const SelectedContent = ({ data }: SelectedContentProps) => {
  const navigate = useNavigate();

  return (
    <li
      className="w-full h-80 space-y-2 flex flex-col text-center cursor-pointer"
      onClick={() => navigate(`${data.contentid}/${data.contenttypeid}`)}
    >
      <img
        className="block w-full h-3/4 rounded-md"
        src={data.firstimage || data.firstimage2 || "../images/noImage.jpg"}
        alt={data.title}
      />
      <h3>{data.title}</h3>
      <h5>{data.addr1}</h5>
    </li>
  );
};

export default SelectedContent;
