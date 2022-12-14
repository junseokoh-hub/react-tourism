import React from "react";
import { Link, useLocation } from "react-router-dom";

type OutletIndicatorProps = {
  indicators: {
    match: string;
    path: string;
    title: string;
  }[];
};

const OutletIndicator = ({ indicators }: OutletIndicatorProps) => {
  const location = useLocation();

  return (
    <nav className="flex shadow-md rounded-md dark:shadow-[0px_0px_3px_rgba(255,255,255,0.5)]">
      {indicators.map((idc) => (
        <Link
          key={idc.title}
          to={idc.path}
          className="py-3 px-1 w-1/2 block text-lg text-center dark:text-white"
        >
          {idc.title}
          {location.pathname === `/${idc.match}` && (
            <div className="mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500" />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default React.memo(OutletIndicator);
