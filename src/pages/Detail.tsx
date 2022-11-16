import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { detailCommon } from "../api";
import Loader from "../utils/Loader";

type DetailCommonType = {
  contenttypeid: "string";
  booktour: "string";
  createdtime: "string";
  homepage: "string";
  modifiedtime: "string";
  tel: "string";
  telname: "string";
  title: "string";
  firstimage: "string";
  firstimage2: "string";
  areacode: "string";
  sigungucode: "string";
  cat1: "string";
  cat2: "string";
  cat3: "string";
  addr1: "string";
  addr2: "string";
  zipcode: "string";
  mapx: "string";
  mapy: "string";
  mlevel: "string";
  overview: "string";
  contentid: "string";
};

const Detail = () => {
  const { contentId } = useParams();

  const { data, isLoading } = useQuery<DetailCommonType>(
    ["accommodation-detail", contentId],
    () => detailCommon(contentId as string),
  );

  console.log(data);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="space-y-4">
          <img
            className="w-48 h-48"
            src={data?.firstimage || data?.firstimage2}
          />
          <h3>{data?.title}</h3>
          <h4>{data?.overview}</h4>
          <div>
            <span>{data?.telname}</span>
            <span>{data?.tel}</span>
            <a href={data?.homepage} target="_blank" rel="noopener noreferrer">
              {data?.homepage}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
