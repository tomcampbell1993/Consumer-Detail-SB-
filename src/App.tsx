import "./App.css";
import { useState } from "react";
import TotalAmount from "./components/TotalAmount";
import Category from "./components/Category";
import SavingsAdvice from "./components/SavingsAdvice";

function App() {
  const [page, setPage] = useState<number>(0);

  function SwapGraph() {
    if (page === 0) {
      return <TotalAmount />
    }
    if (page === 1) {
      return <Category />
    }
    if (page === 2) {
      return <SavingsAdvice />
    }
  }

  return (
    <>
      <div className="header">
        <h5>Fix your funds</h5>
        <button onClick={()=>setPage(0)}>Total</button>
        <button onClick={()=>setPage(1)}>Monthly</button>
        <button onClick={()=>setPage(2)}>Savings Advice</button>
      </div>
      <div className="main">
        <h2>
          Produced, written and directed by Web Team Dream Supreme (jazz interlude) +
          1 other
        </h2>
        <h3>
          In memoriam sainsburys Bank
        </h3>
        <SwapGraph />
      </div>
    </>
  );
}

export default App;
