import { useEffect, useRef, useState } from "react";

export const useObserve = () => {
  const [isView, setIsView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (targetRef.current && entries[0].isIntersecting) {
        io.unobserve(targetRef.current);
        setIsView(true);
      }
    });

    if (targetRef.current) {
      io.observe(targetRef.current);
    }
  }, []);

  return { targetRef, isView };
};
