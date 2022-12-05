import { Link } from "react-router-dom";

const HomeSliders = () => {
  return (
    <section className="pt-10 space-y-10">
      <Link
        to="camping"
        className="p-2 rounded-lg border border-solid hover:bg-teal-500 transition-colors dark:text-white"
      >
        go camping
      </Link>
    </section>
  );
};

export default HomeSliders;
