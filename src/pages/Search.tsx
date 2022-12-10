import { useMatch } from "react-router-dom";
import DomesticSearch from "../components/Search/DomesticSearch";
import SEOMeta from "../SEOMeta";

const Search = () => {
  const searchMatch = useMatch("search/*");
  const domesticMatch = useMatch("search/domestic");

  return (
    <>
      <SEOMeta title={"검색"} content={"여행 정보에 대해 검색해보세요."} />
      <section className={`${searchMatch} && mt-[180px] dark:text-white`}>
        {domesticMatch && <DomesticSearch />}
      </section>
    </>
  );
};

export default Search;
