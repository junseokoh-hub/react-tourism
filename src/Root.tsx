import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useObserve } from "./hooks/useObserve";

const MainHeader = React.lazy(() => import("./components/UI/MainHeader"));
const LowerNavigation = React.lazy(
  () => import("./components/Layout/LowerNavigation"),
);
const Layout = React.lazy(() => import("./components/Layout/Layout"));
const Footer = React.lazy(() => import("./components/Layout/Footer"));

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
        <Footer />
      </main>
      <LowerNavigation />
    </>
  );
};

export default Root;
