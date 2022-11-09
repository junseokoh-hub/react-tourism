import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./components/UI/MainHeader";
import Footer from "./components/Layout/Footer";
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
      <Footer />
    </>
  );
};

export default Root;
