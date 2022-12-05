import { useRef, useState } from "react";
import BarChart from "./BarChart";

const VisitorData = () => {
  const [date, setDate] = useState(false);
  const dateRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="min-h-[400px] space-y-4 dark:text-white">
      <h3>얼마나 많은 사람들이 지역을 방문할까?</h3>
      <article className="max-h-[400px] space-y-6 flex flex-col">
        <div className="space-x-3">
          <label className="font-semibold" htmlFor="date">
            날짜 :
          </label>
          <input
            id="date"
            className="py-1 px-2 border rounded-md font-semibold font-mono"
            type="date"
            ref={dateRef}
          />
          <button
            className="py-1 px-6 border-0 text-white font-semibold bg-teal-400 rounded-md transition-colors cursor-pointer hover:bg-teal-700"
            onClick={() => setDate((prev) => !prev)}
          >
            검색
          </button>
        </div>
        <BarChart date={dateRef.current?.value.split("-").join("") as string} />
      </article>
    </section>
  );
};

export default VisitorData;
