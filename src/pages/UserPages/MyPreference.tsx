import { Link, Outlet, useMatch } from "react-router-dom";
import SEOMeta from "../../SEOMeta";

const MyPreference = () => {
  const tourismPreferenceMatch = useMatch("myPreference/tourism");
  const campingPreferenceMatch = useMatch("myPreference/camping");
  return (
    <>
      <SEOMeta title={"나의 선호"} content={"내가 선호하는 여행지"} />
      <article className="flex flex-col">
        <nav className="flex shadow-md rounded-md dark:shadow-[0px_0px_3px_rgba(255,255,255,0.5)]">
          <Link
            to="tourism"
            className="py-3 px-1 w-1/2 block text-lg text-center dark:text-white"
          >
            여행지
            {tourismPreferenceMatch && (
              <div
                className={
                  "mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500"
                }
              />
            )}
          </Link>
          <Link
            to="camping"
            className="py-3 w-1/2 block text-lg text-center dark:text-white"
          >
            캠핑지
            {campingPreferenceMatch && (
              <div className="mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500" />
            )}
          </Link>
        </nav>
        <Outlet />
      </article>
    </>
  );
};

export default MyPreference;
