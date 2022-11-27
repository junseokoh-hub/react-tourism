import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const MainHeader = React.lazy(() => import("./components/UI/MainHeader"));
const Footer = React.lazy(() => import("./components/Layout/Footer"));
const Layout = React.lazy(() => import("./components/Layout/Layout"));

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

  return (
    <>
      <MainHeader isView={isView} />
      <div ref={targetRef} />
      <main className="max-w-3xl md:mx-auto md:shadow-2xl">
        <Layout>
          <Outlet />
        </Layout>
        <section className="w-full min-h-[300px] bg-[lightgray] "></section>
      </main>
      <Footer />
    </>
  );
};

export default Root;
