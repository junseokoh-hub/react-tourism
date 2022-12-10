import { useNavigate } from "react-router-dom";

type CampingIndicatorProps = {
  sliderId: string;
};

const CampingIndicator = ({ sliderId }: CampingIndicatorProps) => {
  const navigate = useNavigate();

  return (
    <section className="px-2 w-full space-y-7">
      <h2>캠핑 가고 싶으시다면 여기로~!</h2>
      <div className="space-x-3">
        <button
          className="p-2 rounded-md border border-solid border-blue-500 text-blue-500 bg-transparent transition-colors cursor-pointer dark:text-orange-500 dark:border-orange-500 dark:text-orange hover:bg-blue-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white"
          onClick={() => (document.getElementById(sliderId)!.scrollLeft -= 730)}
        >
          직접 검색하기
        </button>
        <button
          className="p-2 rounded-md border border-solid border-blue-500 text-blue-500 bg-transparent transition-colors cursor-pointer dark:text-orange-500 dark:border-orange-500 dark:text-orange hover:bg-blue-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white"
          onClick={() => (document.getElementById(sliderId)!.scrollLeft += 730)}
        >
          지도로 검색하기
        </button>
      </div>
      <ul
        id={sliderId}
        className="w-full flex space-x-1 overflow-x-hidden transition-all scroll-smooth"
      >
        <li
          className="cursor-pointer"
          onClick={() => navigate("camping/input-search")}
        >
          <img
            className="w-[725px] h-[400px] block rounded-md"
            src={"../images/camping1.jpg"}
            alt={"camping"}
          />
        </li>
        <li
          className="cursor-pointer"
          onClick={() => navigate("camping/map-search")}
        >
          <img
            className="w-[725px] h-[400px] block rounded-md"
            src={"../images/camping2.jpg"}
            alt={"camping"}
          />
        </li>
      </ul>
    </section>
  );
};

export default CampingIndicator;
