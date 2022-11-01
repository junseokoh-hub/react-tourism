import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import SideMenu from "../SideMenu/SideMenu";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {isMenuOpen && (
        <Modal closeModal={closeModal}>
          <SideMenu />
        </Modal>
      )}
      <header className="py-5 px-3 space-x-3 w-full flex justify-between bg-zinc-600 text-white font-bold">
        <nav>
          <Link to="/">Tourism</Link>
        </nav>
        <nav className="space-x-3 flex">
          <Link to="/search">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
          <span
            className="cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
