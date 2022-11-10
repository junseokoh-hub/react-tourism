import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { areaCode, searchStay } from "../api";
import SelectBox from "../components/SelectBox/SelectBox";
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
  const [province, setProvince] = useState<ProvinceType[]>([]);
  const { data, isLoading } = useQuery<AreaCodeType[]>(
    ["areaCode", realm],
    () => areaCode(realm),
  );

  const callStay = useCallback(async () => {
    // await searchStay(realm, city);
    setProvince(await searchStay(realm, city));
    console.log(await searchStay(realm, city));
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
        onClick={callStay}
        className="py-2 w-20 rounded-md outline-none select-none border-0 text-white bg-blue-400 font-semibold cursor-pointer hover:bg-blue-600"
      >
        선택
      </button>
      <ul>
        {province.map((prov) => (
          <li key={prov.contentid}>{prov.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Accommodation;
