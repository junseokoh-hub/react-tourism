import React, { useState } from "react";
import { useQuery } from "react-query";
import { areaBasedList, areaCode } from "../../api";
import { AreaCodeType, areas } from "../../lib/area";

const SelectBox = React.lazy(() => import("../SelectBox/SelectBox"));
const SelectedContent = React.lazy(
  () => import("../SelectedContents/SelectedContent"),
);

type PostsProps = {
  contentType:
    | "accommodation"
    | "festival"
    | "restaurant"
    | "shopping"
    | "cultural-facilities"
    | "leisure-sports"
    | "tourist-destination"
    | "travel-course";
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

  console.log(province);

  return (
    <div className="space-x-2">
      <SelectBox value={realm} setValue={setRealm} options={areas} />
      <SelectBox
        isLoading={isLoading}
        value={city}
        setValue={setCity}
        options={data as AreaCodeType[]}
      />
      {!provinceLoading && province === undefined && (
        <div className="mt-10 text-center">검색 결과가 없습니다.</div>
      )}
      {province && province.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-2">
          {province.map((prov) => (
            <SelectedContent
              isLoading={provinceLoading}
              data={prov}
              key={prov.contentid}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
