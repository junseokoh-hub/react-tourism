import React, { useCallback, useState } from "react";
import BarChart from "./BarChart";

const VisitorData = () => {
  const now = new Date();
  const prevMonth = new Date(now.setMonth(now.getMonth() - 1));
  const initialValue = prevMonth.toISOString().slice(0, 10);
  const [date, setDate] = useState(initialValue);

  const splitedDate = date.split("-").join("");

  const dateChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    [],
  );

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
            value={date}
            onChange={dateChangeHandler}
          />
          <button className="py-1 px-6 border-0 text-white font-semibold bg-teal-400 rounded-md transition-colors cursor-pointer hover:bg-teal-700">
            검색
          </button>
        </div>
        <BarChart date={splitedDate} />
      </article>
    </section>
  );
};

export default VisitorData;
