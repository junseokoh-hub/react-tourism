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

  console.log("rendering");

  return (
    <div>
      <SelectBox value={realm} setValue={setRealm} options={areas} />
      {<SelectBox isLoading={isLoading} options={data as AreaCodeType[]} />}
    </div>
  );
};

export default Accommodation;
