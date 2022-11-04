import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Layout from "./components/Layout/Layout";

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
      <Layout>
        <Outlet />
      </Layout>
      <footer className="py-2 px-2 fixed bottom-0 left-0 right-0 bg-teal-300 shadow-md">
        <span>Home</span>
      </footer>
    </>
  );
};

export default Root;
