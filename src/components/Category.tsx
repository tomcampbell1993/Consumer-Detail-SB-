import { useEffect, useState } from "react";
import spendingCodes from "../assets/SpendingCodes";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Data } from "../model";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Category({ data }: { data: Data[] }) {
  const [labels, setLabel] = useState<string[]>([]);
  const [dataSet, setDataSet] = useState<number[]>([]);
  const [dataCount, setDataCount] = useState<number>(5);

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    const dataMap = data.reduce((acc, current) => {
      const month = new Date(current.timestamp).getUTCMonth();
      const category = current.recipient.mcc;
      const amount = parseFloat(current.amount);
      const key = (spendingCodes as { [k: string]: string })[category];
      if (selectedMonth !== null && month !== selectedMonth) {
        return acc;
      }

      if (key in acc) {
        acc[key] += amount;
      } else {
        acc[key] = amount;
      }
      acc[key] = Number(acc[key].toFixed(2));
      return acc;
    }, {} as { [k: string]: number });

    const topFiveCategoriesAndAmount = Object.entries(dataMap).sort(
      (a, b) => b[1] - a[1]
    );

    const topFiveCategories = topFiveCategoriesAndAmount
      .map((el) => el[0])
      .slice(0, dataCount);
    const topFiveAmount = topFiveCategoriesAndAmount
      .map((el) => el[1])
      .slice(0, dataCount);

    setLabel(topFiveCategories);
    setDataSet(topFiveAmount);
  }, [selectedMonth, dataCount]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const graphData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataSet,
        backgroundColor: [
          "#ec0075",
          "#ff5b00",
          "#f6884c",
          "#ffdf2b",
          "#2ce5b7",
          "#2be1f2",
        ],
        borderColor: [
          "#ec0075",
          "#ff5b00",
          "#f6884c",
          "#ffdf2b",
          "#2ce5b7",
          "#2be1f2",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="category__buttons">
        <button onClick={() => setSelectedMonth(0)}>January</button>
        <button onClick={() => setSelectedMonth(1)}>Febuary</button>
        <button onClick={() => setSelectedMonth(2)}>March</button>
        <button onClick={() => setSelectedMonth(3)}>April</button>
        <button onClick={() => setSelectedMonth(null)}>Total</button>
      </div>
      <h2>Your spending summary by category</h2>
      <label>Select the number of datasets to display </label>
      <input
        type="number"
        onChange={(e) => setDataCount(Number(e.target.value))}
      ></input>
      <Pie
        className="pie"
        height={450}
        width={450}
        options={options}
        data={graphData}
      />
    </>
  );
}
