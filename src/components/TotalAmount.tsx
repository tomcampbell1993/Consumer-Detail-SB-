import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Data } from "../model";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TotalAmount({ data }: { data: Data[] }) {
  const labels = ["January", "February", "March", "April"];

  const dataMap = data.reduce((acc, current) => {
    const month = new Date(current.timestamp).getUTCMonth();
    const amount = parseFloat(current.amount);
    const key = labels[month];

    if (key in acc) {
      acc[key] += amount;
    } else {
      acc[key] = amount;
    }
    acc[key] = Number(acc[key].toFixed(2));
    return acc;
  }, {} as { [k: string]: number });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Graph to show total amount spent per month",
      },
    },
  };

  const graphData = {
    labels,
    datasets: [
      {
        label: "Total amount spent",
        data: dataMap,
        backgroundColor: "#8cff1f",
      },
    ],
  };

  return <Bar className="bar" options={options} data={graphData} />;
}
