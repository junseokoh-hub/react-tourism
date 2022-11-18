import { useState } from "react";
import { useQuery } from "react-query";
import { areaBasedList, areaCode } from "../api";
import SelectBox from "../components/SelectBox/SelectBox";
import SelectedContent from "../components/SelectedContents/SelectedContent";
import { areas } from "../lib/area";
import { AreaCodeType } from "./Accommodation";

const Restaurant = () => {
  const [realm, setRealm] = useState("1");
  const [city, setCity] = useState("1");

  const { data, isLoading } = useQuery<AreaCodeType[]>(
    ["areaCode", realm],
    () => areaCode(realm),
  );

  const { data: province, isLoading: provinceLoading } = useQuery(
    ["restaurant", realm, city],
    () => areaBasedList(realm, city, "39"),
  );

  if (province) {
    console.log(province);
  }

  return (
    <div className="space-x-2">
      <SelectBox value={realm} setValue={setRealm} options={areas} />
      <SelectBox
        isLoading={isLoading}
        value={city}
        setValue={setCity}
        options={data as AreaCodeType[]}
      />
      <ul className="mt-10 grid grid-cols-2 gap-2">
        {province &&
          province.length > 0 &&
          province.map((prov) => (
            <SelectedContent
              isLoading={provinceLoading}
              data={prov}
              key={prov.contentid}
            />
          ))}
      </ul>
    </div>
  );
};

export default Restaurant;
