import React, { useState } from "react";
import { useQuery } from "react-query";
import { areaBasedList, areaCode } from "../../api/tourismApi";
import { AreaCodeType, areas } from "../../lib/area";
import Loader from "../../utils/Loader";

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

  return (
    <div className="space-x-2">
      <SelectBox value={realm} setValue={setRealm} options={areas} />
      <SelectBox
        isLoading={isLoading}
        value={city}
        setValue={setCity}
        options={data as AreaCodeType[]}
      />
      {!provinceLoading && province === undefined ? (
        <div className="mt-10 text-center">검색 결과가 없습니다.</div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-2">
          {province &&
            province.length > 0 &&
            province.map((prov) => (
              <SelectedContent data={prov} key={prov.contentid} />
            ))}
        </ul>
      )}
      {provinceLoading && <Loader />}
    </div>
  );
};

export default Posts;
