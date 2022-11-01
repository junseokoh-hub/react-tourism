import { Outlet } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";

const Root = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default Root;
