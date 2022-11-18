import React from "react";
import { AreasType } from "../../lib/area";

type SliderProps = {
  sliderId: string;
  data: AreasType[];
};

const Slider = ({ sliderId, data }: SliderProps) => {
  return (
    <div className="my-10 relative flex items-center">
      <ul
        className="flex overflow-hidden transition-all duration-500 ease-in-out scroll-smooth"
        id={sliderId}
      >
        {data.map((item) => (
          <li className="mx-0.5" key={item.rnum}>
            <img
              className="w-[200px] h-48 block rounded-full"
              src=""
              alt={item.name}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => (document.getElementById(sliderId)!.scrollLeft -= 300)}
        className="w-10 h-full absolute left-0 top-0 border-0 cursor-pointer bg-[rgba(0,0,0,0.1)] transition duration-500 ease-in-out hover:bg-[rgba(0,0,0,0.3)] hover:text-white"
      >
        &larr;
      </button>
      <button
        onClick={() => (document.getElementById(sliderId)!.scrollLeft += 300)}
        className="w-10 h-full absolute top-0 right-0 border-0 cursor-pointer bg-[rgba(0,0,0,0.1)] transition duration-500 ease-in-out hover:bg-[rgba(0,0,0,0.3)] hover:text-white"
      >
        &rarr;
      </button>
    </div>
  );
};

export default React.memo(Slider);
