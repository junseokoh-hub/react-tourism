import React, { useState } from "react";
import { useQuery } from "react-query";
import { areaBasedList, areaCode } from "../../api/tourismApi";
import { AreaCodeType, areas } from "../../lib/area";
import SEOMeta from "../../SEOMeta";
import Loader from "../../utils/Loader";

const SelectBox = React.lazy(() => import("../SelectBox/SelectBox"));
const SelectedContent = React.lazy(
  () => import("../SelectedContents/SelectedContent"),
);

type PostsProps = {
  title:
    | "숙박"
    | "문화시설"
    | "축제"
    | "레포츠"
    | "음식점"
    | "쇼핑"
    | "관광지"
    | "여행코스";
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

const Posts = ({ title, contentType, contentTypeId }: PostsProps) => {
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
    <>
      <SEOMeta
        title={title}
        content={`어느 ${title}을 들르시고 싶은 지 확인해 보세요.`}
      />
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
          <ul className="mt-10 grid grid-cols-2 gap-2 dark:text-white">
            {province &&
              province.length > 0 &&
              province.map((prov) => (
                <SelectedContent data={prov} key={prov.contentid} />
              ))}
          </ul>
        )}
        {provinceLoading && <Loader />}
      </div>
    </>
  );
};

export default Posts;
