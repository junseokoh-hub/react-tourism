import Slider from "../UI/Slider";
import { areas } from "../../lib/area";
import { categories } from "../../lib/category";

const HomeSliders = () => {
  return (
    <section className="pt-10">
      <Slider sliderId="areas" data={areas.slice(0, 7)} />
      <Slider sliderId="categories" data={categories} />
    </section>
  );
};

export default HomeSliders;
