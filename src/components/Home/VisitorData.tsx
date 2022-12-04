import { useRef, useState } from "react";
import BarChart from "./BarChart";

const VisitorData = () => {
  // const [date, setDate] = useState("2021-10-10");
  const [date, setDate] = useState(false);
  const dateRef = useRef<HTMLInputElement | null>(null);
  // console.log(date.split("-").join(""));

  console.log("date");

  return (
    <section className="min-h-[400px] flex flex-col">
      <div>
        <input
          className="w-28"
          type="date"
          ref={dateRef}
          // value={date}
          // onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={() => setDate((prev) => !prev)}>검색</button>
      </div>
      <BarChart date={dateRef.current?.value.split("-").join("") as string} />
    </section>
  );
};

export default VisitorData;
