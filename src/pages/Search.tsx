import { useMatch } from "react-router-dom";
import DomesticSearch from "../components/Search/DomesticSearch";
import RouteSearch from "../components/Search/RouteSearch";
import SEOMeta from "../SEOMeta";

const Search = () => {
  const searchMatch = useMatch("search/*");
  const domesticMatch = useMatch("search/domestic");
  const routeMatch = useMatch("search/route");

  return (
    <>
      <SEOMeta title={"검색"} content={"여행 정보에 대해 검색해보세요."} />
      <section className={`${searchMatch} && mt-[180px] dark:text-white`}>
        {domesticMatch && <DomesticSearch />}
        {routeMatch && <RouteSearch />}
      </section>
    </>
  );
};

export default Search;
