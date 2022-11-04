import { useCallback, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "../../store/hooks";
import Modal from "../Modal/Modal";
import SideMenu from "../SideMenu/SideMenu";

type MainHeaderProps = {
  isView: boolean;
};

const MainHeader = ({ isView }: MainHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchMatch = useMatch("search");
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  const closeModal = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {isMenuOpen && (
        <Modal closeModal={closeModal}>
          <SideMenu closeModal={closeModal} />
        </Modal>
      )}
      <header
        className={`py-5 px-3 space-x-3 w-full fixed top-0 left-0 right-0 flex justify-between bg-transparent font-bold ${
          isView || "shadow-md bg-white"
        } transition-shadow duration-500 ease-in-out`}
      >
        <nav>
          {searchMatch ? (
            <span onClick={() => navigate(-1)}>
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
          ) : (
            <Link to="/" className="text-2xl">
              Tourism
            </Link>
          )}
        </nav>
        <nav className="space-x-3 flex items-center">
          <Link to="/search">
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
          {!authUser && <Link to="login">Login</Link>}
          {authUser && (
            <span onClick={() => setIsMenuOpen((prev) => !prev)}>
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
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
