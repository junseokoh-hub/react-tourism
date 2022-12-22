import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "../../store/hooks";
import { setDark } from "../../store/slices/darkSlice";
import SearchBox from "../Search/SearchBox.js";

type MainHeaderProps = {
  isView: boolean;
};

const MainHeader = ({ isView }: MainHeaderProps) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.dark.isDark);
  const homeMatch = useMatch("/");
  const searchMatch = useMatch("search/*");
  const navigate = useNavigate();

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      dispatch(setDark(true));
      return;
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(setDark(false));
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    dispatch(setDark(true));
  }, []);

  return (
    <header
      className={`py-5 fixed top-0 left-0 right-0 bg-white font-bold z-50 ${
        !isView ? "shadow-xl" : "shadow-sm"
      } transition-all ease-in-out dark:bg-black`}
    >
      <nav className="px-5 flex items-center md:max-w-3xl md:mx-auto">
        {!homeMatch && (
          <div className="w-1/3">
            <span onClick={() => navigate(-1)} className="dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          </div>
        )}
        <div
          className={`${!homeMatch ? "w-1/3" : "w-1/2"} flex ${
            !homeMatch ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/"
            className="text-2xl dark:text-white"
            aria-label="home-link"
          >
            Travelisty
          </Link>
        </div>
        <div
          className={`${
            !homeMatch ? "w-1/3" : "w-1/2"
          } space-x-3 flex justify-end items-center`}
        >
          <Link
            to="/search/domestic"
            aria-label="search-link"
            className="dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
          <div
            onClick={toggleDarkMode}
            className={`p-1 w-16 h-8 flex items-center rounded-full shadow-[0px_0px_5px_rgba(0,0,0,0.2)] dark:shadow-[0px_0px_5px_rgba(255,255,255,0.5)] cursor-pointer`}
          >
            <div
              className={`w-7 h-7 rounded-full shadow-[0px_0px_5px_rgba(0,0,0,0.2)] ${
                !isDark ? "translate-x-0" : "translate-x-[27px]"
              } transition-all dark:shadow-[0px_0px_5px_rgba(255,255,255,0.5)]`}
            ></div>
          </div>
        </div>
      </nav>
      {searchMatch && (
        <nav className="mt-3 max-w-3xl md:mx-auto">
          <ul className="p-6 flex space-x-3">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900 dark:text-orange-500"
                    : "dark:text-white"
                }
                to="search/domestic"
              >
                국내여행
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900 dark:text-orange-500"
                    : "dark:text-white"
                }
                to="search/route"
              >
                길
              </NavLink>
            </li>
          </ul>
          <SearchBox />
        </nav>
      )}
    </header>
  );
};

export default MainHeader;
