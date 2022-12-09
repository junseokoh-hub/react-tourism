import { useEffect, useRef, useState } from "react";

export const useObserve = () => {
  const [isView, setIsView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      setIsView(entries[0].isIntersecting);
    });

    if (targetRef.current) {
      io.observe(targetRef.current);
    }

    return () => {
      io.disconnect();
    };
  }, []);

  return { targetRef, isView };
};
