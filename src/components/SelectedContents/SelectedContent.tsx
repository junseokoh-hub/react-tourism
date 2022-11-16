import { Outlet, useNavigate } from "react-router-dom";

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
  isLoading: boolean;
  data: ProvinceType;
};

const SelectedContent = ({ isLoading, data }: SelectedContentProps) => {
  const navigate = useNavigate();
  const imageExistence = data.firstimage && data.firstimage2;

  return (
    <>
      {!isLoading && imageExistence && (
        <li
          className="w-full h-80 space-y-2 flex flex-col text-center cursor-pointer"
          onClick={() => navigate(`${data.contentid}/${data.contenttypeid}`)}
        >
          <img
            className="block w-full h-3/4"
            src={data.firstimage || data.firstimage2}
            alt={data.title}
          />
          <h3>{data.title}</h3>
          <h4>{data.addr1}</h4>
        </li>
      )}
    </>
  );
};

export default SelectedContent;
