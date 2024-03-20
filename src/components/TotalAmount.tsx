import data from "../../data/data.json";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TotalAmount() {
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
        text: "Chart.js Bar Chart",
      },
    },
  };

  const graphData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataMap,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={graphData} />;
}
