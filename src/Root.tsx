import React from "react";
import { Outlet } from "react-router-dom";
import { useObserve } from "./hooks/useObserve";

const mainHeader = import("./components/UI/MainHeader");
const lowerNavigation = import("./components/Layout/LowerNavigation");
const layout = import("./components/Layout/Layout");
const footer = import("./components/Layout/Footer");

const MainHeader = React.lazy(() => mainHeader);
const LowerNavigation = React.lazy(() => lowerNavigation);

const Layout = React.lazy(() => layout);
const Footer = React.lazy(() => footer);

const Root = () => {
  const { isView, targetRef } = useObserve();
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <MainHeader isView={isView} />
      <div ref={targetRef} />
      <main className="w-full md:mx-auto overflow-x-hidden md:max-w-3xl md:shadow-2xl">
        <Layout>
          <Outlet />
        </Layout>
        {!isView && <Footer />}
      </main>
      <LowerNavigation />
    </>
  );
};

export default Root;
