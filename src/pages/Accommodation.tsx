import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { areaCode } from "../api";
import SelectBox from "../components/SelectBox/SelectBox";
import { areas, AreasType } from "../lib/area";
import { queryClient } from "../main";

export type AreaCodeType = {
  rnum: number;
  code: string;
  name: string;
};

const Accommodation = () => {
  const [realm, setRealm] = useState("1");
  const { data, isLoading } = useQuery<AreaCodeType[]>(
    ["areaCode", realm],
    () => areaCode(realm),
  );

  return (
    <div className="space-x-2">
      <SelectBox value={realm} setValue={setRealm} options={areas} />
      <SelectBox isLoading={isLoading} options={data as AreaCodeType[]} />
      <button className="py-2 w-20 rounded-md outline-none select-none border-0 text-white bg-blue-400 font-semibold cursor-pointer hover:bg-blue-600">
        선택
      </button>
    </div>
  );
};

export default Accommodation;
