import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { MetVisitorType, metVistior } from "../../api/bigDataApi";
import Loader from "../../utils/Loader.js";
import { useSelector } from "../../store/hooks";

type DataType = {
  labels: string[];
  datasets: {
    label: string;
    data: string[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

type BarChartProps = {
  date: string | null;
};

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ date }: BarChartProps) => {
  const isDark = useSelector((state) => state.dark.isDark);
  const { data: chart, isLoading } = useQuery(
    ["metroData", date],
    () => {
      if (date) {
        return metVistior(date, date);
      }
    },
    {
      retry: false,
      enabled: !!date,
    },
  );

  function SlicedChart(): Array<MetVisitorType[]> {
    const result = [];
    if (chart) {
      for (let i = 0; i < chart?.length; i += 3) {
        result.push(chart?.slice(i, i + 3));
      }
    }
    return result;
  }

  useEffect(() => {
    SlicedChart();
  }, [SlicedChart, date]);

  let data: DataType = {
    labels: SlicedChart()?.map((item) => item[0].areaNm),
    datasets: [
      {
        label: "현지인",
        data: SlicedChart()?.map((item) => item[0].touNum),
        backgroundColor: "lightblue",
        borderColor: "lightblue",
        borderWidth: 1,
      },
      {
        label: "외지인",
        data: SlicedChart()?.map((item) => item[1].touNum),
        backgroundColor: "#ff8c00",
        borderColor: "#ff8c00",
        borderWidth: 1,
      },
    ],
  };

  let delayed: any;
  let options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: isDark ? "white" : "",
        },
      },
      y: {
        ticks: {
          stepSize: 500000,
          color: isDark ? "white" : "",
        },
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
        labels: {},
      },
      title: {
        display: true,
        text: "광역지자체 지역 방문자 수 (단위: 명)",
      },
    },
  };

  return (
    <>
      {isLoading && !chart ? (
        <Loader position={"top-0"} />
      ) : (
        <Bar
          width={700}
          height={400}
          data={data}
          options={options}
          className="dark:shadow-sm dark:shadow-[rgba(255,255,255,0.4)]"
        />
      )}
    </>
  );
};

export default React.memo(BarChart);
