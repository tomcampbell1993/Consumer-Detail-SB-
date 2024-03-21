/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { useEffect, useState } from "react";
import TotalAmount from "./components/TotalAmount";
import Category from "./components/Category";
import SavingsAdvice from "./components/SavingsAdvice";
import { Data } from "./model";
import data1 from "../data/data.json";
import data2 from "../data/data2.json";
import data3 from "../data/data3.json";

function App() {
  const [page, setPage] = useState<number>(0);
  const [card, setCard] = useState(1);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    async function importData() {
      switch (card) {
        case 1:
          setData(data1 as any);
          break;
        case 2:
          setData(data2 as any);
          break;
        case 3:
          setData(data3 as any);
          break;
        case 4:
          setData([...data1, ...data2, ...data3] as any);
          break;
      }
    }
    importData();
  }, [card]);

  function SwapGraph() {
    if (page === 0) {
      return <TotalAmount data={data} />
    }
    if (page === 1) {
      return <Category data={data} />
    }
    if (page === 2) {
      return <SavingsAdvice data={data} />
    }
  }

  function onCardSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setCard(Number(e.target.value));
  }

  return (
    <>
      <div className="header">
        <h5>Fix your funds</h5>
        <button onClick={() => setPage(0)}>Total</button>
        <button onClick={() => setPage(1)}>Monthly</button>
        <button onClick={() => setPage(2)}>Savings Advice</button>
        <select onChange={(e) => onCardSelect(e)}>
          <option value={1}>Card 1</option>
          <option value={2}>Card 2</option>
          <option value={3}>Card 3</option>
          <option value={4}>All</option>
        </select>
      </div>
      <div className="main">
        <h2>
          Produced, written and directed by Web Team Dream Supreme (jazz
          interlude) + 1 other
        </h2>
        <h3>In memoriam sainsburys Bank</h3>
        <SwapGraph />
      </div>
    </>
  );
}

export default App;
