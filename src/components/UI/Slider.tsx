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
        id={sliderId}
        className="flex overflow-x-hidden space-x-20 scroll-smooth transition duration-500"
      >
        {data.map((item) => (
          <li className="w-20 h-10 border" key={item.rnum}>
            {item.code}
          </li>
        ))}
      </ul>
      <button
        onClick={() => (document.getElementById(sliderId)!.scrollLeft -= 200)}
        className="w-10 h-10 border"
      >
        &larr;
      </button>
      <button
        onClick={() => (document.getElementById(sliderId)!.scrollLeft += 200)}
        className="w-10 h-10 border"
      >
        &rarr;
      </button>
    </>
  );
};

export default Slider;
