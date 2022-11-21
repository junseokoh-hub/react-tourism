import { useState } from "react";
import { useQuery } from "react-query";
import { areaBasedList, areaCode } from "../../api";
import { AreaCodeType, areas } from "../../lib/area";
import SelectBox from "../SelectBox/SelectBox";
import SelectedContent from "../SelectedContents/SelectedContent";

type PostsProps = {
  contentType:
    | "accommodation"
    | "festival"
    | "restaurant"
    | "shopping"
    | "cultural-facilities"
    | "leisure-sports"
    | "tourist-destination";
  contentTypeId: string;
};

const Posts = ({ contentType, contentTypeId }: PostsProps) => {
  const [realm, setRealm] = useState("1");
  const [city, setCity] = useState("1");

  const { data, isLoading } = useQuery<AreaCodeType[]>(
    ["areaCode", realm],
    () => areaCode(realm),
  );

  const { data: province, isLoading: provinceLoading } = useQuery(
    [contentType, realm, city],
    () => areaBasedList(realm, city, contentTypeId),
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

export default Posts;
