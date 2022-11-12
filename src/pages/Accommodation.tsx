import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { areaCode, searchStay } from "../api";
import SelectBox from "../components/SelectBox/SelectBox";
import SelectedContent from "../components/SelectedContents/SelectedContent";
import { areas } from "../lib/area";

export type AreaCodeType = {
  rnum: number;
  code: string;
  name: string;
};

type ProvinceType = {
  contentid: string;
  title: string;
};

const Accommodation = () => {
  const [realm, setRealm] = useState("1");
  const [city, setCity] = useState("1");

  const { data, isLoading } = useQuery<AreaCodeType[]>(
    ["areaCode", realm],
    () => areaCode(realm),
  );

  const {
    isLoading: provinceLoading,
    data: province,
    refetch,
  } = useQuery<ProvinceType[]>(["city", city], () => searchStay(realm, city), {
    enabled: false,
  });

  const handleStayHandler = useCallback(() => {
    refetch();
  }, [realm, city]);

  return (
    <div className="space-x-2">
      <SelectBox value={realm} setValue={setRealm} options={areas} />
      <SelectBox
        isLoading={isLoading}
        value={city}
        setValue={setCity}
        options={data as AreaCodeType[]}
      />
      <button
        onClick={handleStayHandler}
        className="py-2 w-20 rounded-md outline-none select-none border-0 text-white bg-blue-400 font-semibold cursor-pointer hover:bg-blue-600"
      >
        선택
      </button>
      <ul className="mt-10 grid grid-cols-2 gap-2">
        {province &&
          province.length > 0 &&
          province.map((prov) => {
            return (
              <SelectedContent
                isLoading={provinceLoading}
                data={prov as ProvinceType}
                key={prov.contentid}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Accommodation;
