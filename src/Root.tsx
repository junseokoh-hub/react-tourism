import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LowerNavigation from "./components/Layout/LowerNavigation";
import MainHeader from "./components/UI/MainHeader";
import { useObserve } from "./hooks/useObserve";
import Loader from "./utils/Loader";

const layout = import("./components/Layout/Layout");
const Layout = React.lazy(() => layout);
const Footer = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./components/Layout/Footer"),
  ),
);

const Root = () => {
  const { isView, targetRef } = useObserve();

  return (
    <>
      <MainHeader isView={isView} />
      <div ref={targetRef} />
      <main className="w-full min-h-screen bg-white md:mx-auto overflow-hidden md:max-w-3xl md:shadow-2xl dark:bg-black">
        <Suspense fallback={<Loader position={"top-[100px]"} />}>
          <Layout>
            <Outlet />
          </Layout>
          <Footer />
        </Suspense>
      </main>
      <LowerNavigation />
    </>
  );
};

export default Root;
