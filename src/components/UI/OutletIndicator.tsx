import { Link, useMatch } from "react-router-dom";

type OutletIndicatorProps = {
  indicators: {
    match: string;
    path: string;
    title: string;
  }[];
};

const OutletIndicator = ({ indicators }: OutletIndicatorProps) => {
  const firstMatch = useMatch(indicators[0].match);
  const secondMatch = useMatch(indicators[1].match);

  return (
    <nav className="flex shadow-md rounded-md dark:shadow-[0px_0px_3px_rgba(255,255,255,0.5)]">
      <Link
        to={indicators[0].path}
        className="py-3 px-1 w-1/2 block text-lg text-center dark:text-white"
      >
        {indicators[0].title}
        {firstMatch && (
          <div
            className={
              "mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500"
            }
          />
        )}
      </Link>
      <Link
        to={indicators[1].path}
        className="py-3 w-1/2 block text-lg text-center dark:text-white"
      >
        {indicators[1].title}
        {secondMatch && (
          <div className="mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500" />
        )}
      </Link>
    </nav>
  );
};

export default OutletIndicator;
