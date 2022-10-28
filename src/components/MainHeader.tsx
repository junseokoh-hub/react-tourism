import { NavLink, useMatch } from "react-router-dom";

const MainHeader = () => {
  const homeMatch = useMatch("/");

  return (
    <header className="py-5 px-3 space-x-3 w-full bg-zinc-600 text-white font-bold">
      <NavLink className={homeMatch ? "text-orange-500" : ""} to="/">
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-500" : "")}
        to="/about"
      >
        About
      </NavLink>
    </header>
  );
};

export default MainHeader;
