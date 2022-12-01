import { Helmet } from "react-helmet-async";
import { Outlet, useMatch } from "react-router-dom";
import CampingSearch from "../components/Search/CampingSearch";
import DataSearch from "../components/Search/DataSearch";
import DomesticSearch from "../components/Search/DomesticSearch";

const Search = () => {
  const searchMatch = useMatch("search/*");
  const domesticMatch = useMatch("search/domestic");
  const campingMatch = useMatch("search/camping");
  const dataMatch = useMatch("search/data");

  return (
    <>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <section className={`${searchMatch} && mt-[180px]`}>
        {domesticMatch && <DomesticSearch />}
        {campingMatch && <CampingSearch />}
        {dataMatch && <DataSearch />}
      </section>
    </>
  );
};

export default Search;
