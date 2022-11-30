import { useState } from "react";
import { useQuery } from "react-query";
import { basedList } from "../api/campingApi";
import SelectBox from "../components/SelectBox/SelectBox";
import { areas } from "../lib/area";
import Loader from "../utils/Loader";

const Camping = () => {
  const [value, setValue] = useState("서울시");

  const { data, isLoading } = useQuery(["camping", value], basedList);

  console.log(data?.items?.item.filter((camp: any) => camp.doNm === value));

  const newData = data?.items?.item.filter((camp: any) => camp.doNm === value);

  // console.log(data?.items?.item.map((camp: any) => camp.doNm));

  return (
    <section className="flex flex-colfik">
      <SelectBox value={value} setValue={setValue} options={areas} />

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-5 text-center">
          {newData?.map((camp: any) => (
            <li className="cursor-pointer" key={camp.contentId}>
              <img
                className="w-full block rounded-md"
                src={camp.firstImageUrl || "../images/noImage.jpg"}
                alt={camp.facltNm}
              />
              <h4>{camp.facltNm}</h4>
            </li>
          ))}
        </ul>
      )}
      {newData?.length === 0 && (
        <div className="text-center">검색 결과가 없습니다.</div>
      )}
    </section>
  );
};

export default Camping;
