import { useCallback, useState } from "react";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/hooks";
import { onClose, onOpen } from "../../store/menuSlice";
import Modal from "../Modal/Modal";
import SearchBox from "../Search/SearchBox";
import SideMenu from "./SideMenu";

type MainHeaderProps = {
  isView: boolean;
};

const MainHeader = ({ isView }: MainHeaderProps) => {
  const homeMatch = useMatch("/");
  const searchMatch = useMatch("search/*");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const authUser = useSelector((state) => state.auth.user);

  return (
    <>
      {isMenuOpen && (
        <Modal closeModal={() => dispatch(onClose())}>
          <SideMenu closeModal={() => dispatch(onClose())} />
        </Modal>
      )}
      <header
        className={`py-5 fixed top-0 left-0 right-0 bg-white font-bold z-50 ${
          !isView ? "shadow-xl" : "shadow-sm"
        } transition-shadow duration-500 ease-in-out`}
      >
        <nav className="px-5 flex justify-between items-center max-w-3xl md:mx-auto">
          {!homeMatch && (
            <div>
              <span onClick={() => navigate("/")}>
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
          <div>
            <Link to="/" className="text-2xl" aria-label="home-link">
              Tourism
            </Link>
          </div>
          <div className="space-x-3 flex items-center">
            <Link to="/search/domestic" aria-label="search-link">
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
            {!authUser ? (
              <Link to="login">Login</Link>
            ) : (
              <span onClick={() => dispatch(onOpen())}>
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </span>
            )}
          </div>
        </nav>
        {searchMatch && (
          <nav className="mt-3 max-w-3xl md:mx-auto">
            <ul className="py-6 flex space-x-3">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-900" : "font-normal"
                  }
                  to="search/domestic"
                >
                  국내여행
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-900" : "font-normal"
                  }
                  to="search/camping"
                >
                  캠핑
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-900" : "font-normal"
                  }
                  to="search/data"
                >
                  데이터
                </NavLink>
              </li>
            </ul>
            <SearchBox />
          </nav>
        )}
      </header>
    </>
  );
};

export default MainHeader;
