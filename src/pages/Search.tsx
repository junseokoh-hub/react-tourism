import { Outlet, useMatch } from "react-router-dom";
import CampingSearch from "../components/Search/CampingSearch";
import DomesticSearch from "../components/Search/DomesticSearch";

const Search = () => {
  const searchMatch = useMatch("search/*");
  const domesticMatch = useMatch("search/domestic");
  const campingMatch = useMatch("search/camping");

  return (
    <section className={`${searchMatch} && mt-[180px]`}>
      {domesticMatch && <DomesticSearch />}
      {campingMatch && <CampingSearch />}
    </section>
  );
};

export default Search;
