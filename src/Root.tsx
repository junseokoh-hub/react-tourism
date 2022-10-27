import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <header className="py-5 w-full bg-zinc-600 text-white font-bold">
        This is Header!
      </header>
      <Outlet />
    </>
  );
};

export default Root;
