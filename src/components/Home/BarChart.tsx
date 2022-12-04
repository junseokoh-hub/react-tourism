import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { metVistior } from "../../api/bigDataApi";
import Loader from "../../utils/Loader";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const { data: chart, isLoading } = useQuery("metroData", () =>
    metVistior("20211010", "20211010"),
  );

  function SlicedChart() {
    const result = [];
    for (let i = 0; i < chart?.length!!; i += 3) {
      result.push(chart?.slice(i, i + 3));
    }
    return result;
  }

  useEffect(() => {
    SlicedChart();
  }, [SlicedChart]);

  let data = {
    labels:
      SlicedChart()?.length > 0 && SlicedChart()?.map((x: any) => x[0].areaNm),
    datasets: [
      {
        label: "현지인",
        data:
          SlicedChart()?.length > 0 &&
          SlicedChart()?.map((x: any) => x[0].touNum),
        backgroundColor: "teal",
        borderColor: "teal",
        borderWidth: 1,
      },
      {
        label: "외지인",
        data:
          SlicedChart()?.length > 0 &&
          SlicedChart()?.map((x: any) => x[1].touNum),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  };

  let options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 2000000,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          fontSize: 25,
        },
      },
      title: {
        display: true,
        text: "About Products",
      },
    },
  };

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <Bar
          width={700}
          height={400}
          data={data as any}
          options={options as any}
        />
      )}
    </section>
  );
};

export default BarChart;
