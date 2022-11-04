import React from "react";
import { AreasType } from "../../lib/area";
import { CategoriesType } from "../../lib/category";

type SliderProps = {
  sliderId: string;
  data: AreasType[] | CategoriesType[];
};

const Slider = ({ sliderId, data }: SliderProps) => {
  return (
    <>
      <ul
        className="flex overflow-hidden transition-all duration-500 ease-in-out scroll-smooth"
        id={sliderId}
      >
        {data.map((item) => (
          <li className="mx-0.5" key={item.rnum}>
            <img
              className="w-[200px] h-48 block rounded-full"
              src={item.image}
              alt={item.name}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => (document.getElementById(sliderId)!.scrollLeft -= 300)}
        className="w-10 h-10 border"
      >
        &larr;
      </button>
      <button
        onClick={() => (document.getElementById(sliderId)!.scrollLeft += 300)}
        className="w-10 h-10 border"
      >
        &rarr;
      </button>
    </>
  );
};

export default React.memo(Slider);
