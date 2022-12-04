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
import Loader from "../../utils/Loader";

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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ date }: { date: string }) => {
  const { data: chart, isLoading } = useQuery(
    ["metroData", date],
    () => metVistior(date, date),
    {
      retry: false,
    },
  );

  function SlicedChart(): Array<MetVisitorType[]> {
    const result = [];
    if (chart) {
      for (let i = 0; i < chart?.length!; i += 3) {
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
        backgroundColor: "teal",
        borderColor: "teal",
        borderWidth: 1,
      },
      {
        label: "외지인",
        data: SlicedChart()?.map((item) => item[1].touNum),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  };

  let options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 500000,
        },
      },
    },
    plugins: {
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
        <Loader />
      ) : (
        <Bar width={700} height={400} data={data} options={options} />
      )}
    </>
  );
};

export default React.memo(BarChart);
