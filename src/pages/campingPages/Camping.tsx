import { Link, Outlet, useMatch } from "react-router-dom";
import SEOMeta from "../../SEOMeta";

const Camping = () => {
  const mapMatch = useMatch("camping/map-search");
  const inputMatch = useMatch("camping/input-search");

  return (
    <>
      <SEOMeta
        title={"캠핑 검색"}
        content={"캠핑을 떠나고 싶으시다면 검색해보아요"}
      />
      <section>
        <nav className="flex shadow-md rounded-md dark:shadow-[0px_0px_3px_rgba(255,255,255,0.5)]">
          <Link
            to="input-search"
            className="py-3 px-1 w-1/2 block text-lg text-center dark:text-white"
          >
            검색으로 찾기
            {inputMatch && (
              <div className="mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500 " />
            )}
          </Link>
          <Link
            to="map-search"
            className="py-3 w-1/2 block text-lg text-center dark:text-white"
          >
            지도로 찾기
            {mapMatch && (
              <div className="mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500" />
            )}
          </Link>
        </nav>
        <article className="mt-10">
          <Outlet />
        </article>
      </section>
    </>
  );
};

export default Camping;
