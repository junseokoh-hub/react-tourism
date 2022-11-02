import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Layout from "./components/Layout/Layout";
import { appAuth } from "./lib/firebaseConfig";
import { onState } from "./store/authSlice";
import { useDispatch, useSelector } from "./store/hooks";

const Root = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      dispatch(onState(user));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <MainHeader isView={isView} />
      <div ref={targetRef} />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
