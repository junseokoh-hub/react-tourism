import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LowerNavigation from "./components/Layout/LowerNavigation.js";
import MainHeader from "./components/UI/MainHeader.js";
import { useObserve } from "./hooks/useObserve.js";
import Loader from "./utils/Loader.js";

const layout = import("./components/Layout/Layout.js");
const Layout = React.lazy(() => layout);
const Footer = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./components/Layout/Footer.js"),
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
