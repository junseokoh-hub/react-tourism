import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const MainHeader = React.lazy(() => import("./components/UI/MainHeader"));
const LowerNavigation = React.lazy(
  () => import("./components/Layout/LowerNavigation"),
);
const Layout = React.lazy(() => import("./components/Layout/Layout"));
const Footer = React.lazy(() => import("./components/Layout/Footer"));

const Root = () => {
  const [isView, setIsView] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      setIsView(entries[0].isIntersecting);
    });
    if (targetRef.current) {
      io.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        io.unobserve(targetRef.current);
      }
    };
  }, []);

  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return (
    <>
      <MainHeader isView={isView} />
      <div ref={targetRef} />
      <main className="w-full md:mx-auto md:max-w-3xl md:shadow-2xl">
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
