import { Link } from "react-router-dom";

const CampingIndicator = () => {
  return (
    <section className="px-2 w-full space-y-7">
      <h2>캠핑 가고 싶으시다면 여기로~!</h2>
      <div className="w-full flex space-x-1">
        <Link className="w-1/2 block" to="camping/input-search">
          <img
            className="w-full h-[300px] block rounded-md"
            src={"../images/camping1.jpg"}
            alt={"camping"}
          />
        </Link>
        <Link className="w-1/2 block" to="camping/map-search">
          <img
            className="w-full h-[300px] block rounded-md"
            src={"../images/camping2.jpg"}
            alt={"camping"}
          />
        </Link>
      </div>
    </section>
  );
};

export default CampingIndicator;
