import FrontBanner from "../components/Home/FrontBanner";
import HomeSliders from "../components/Home/HomeSliders";

const Home = () => {
  return (
    <section className="space-y-8 divide-y-2">
      <FrontBanner />
      <HomeSliders />
    </section>
  );
};

export default Home;
