import { useMatch } from "react-router-dom";
import CampingSearch from "../components/Search/CampingSearch";
import DataSearch from "../components/Search/DataSearch";
import DomesticSearch from "../components/Search/DomesticSearch";
import SEOMeta from "../SEOMeta";

const Search = () => {
  const searchMatch = useMatch("search/*");
  const domesticMatch = useMatch("search/domestic");
  const campingMatch = useMatch("search/camping");
  const dataMatch = useMatch("search/data");

  return (
    <>
      <SEOMeta title={"검색"} content={"여행 정보에 대해 검색해보세요."} />
      <section className={`${searchMatch} && mt-[180px]`}>
        {domesticMatch && <DomesticSearch />}
        {campingMatch && <CampingSearch />}
        {dataMatch && <DataSearch />}
      </section>
    </>
  );
};

export default Search;
