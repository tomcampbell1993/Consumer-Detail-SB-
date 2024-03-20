import "./App.css";
import { useState } from "react";
import TotalAmount from "./components/TotalAmount";
import Category from "./components/Category";
import SavingsAdvice from "./components/SavingsAdvice";

function App() {

    const [page, setPage] = useState<number>(0);

    function SwapGraph() {
      if(page === 0){
        return <TotalAmount />
      }
      if(page === 1){
        return <Category />
      }
      if(page === 2){
        return <SavingsAdvice />
      }
    }

  return (
    <>
      <div>
        <h1>Fix your funds</h1>
        <h3>
          Produced, written and directed by Web Team Supreme (jazz interlude) +
          1 other
        </h3>
        <h2>In memoriam sainsburys bank</h2>
      </div>
      <button onClick={() => setPage(0)}>Total</button>
      <button onClick={() => setPage(1)}>Monthly</button>
      <button onClick={() => setPage(2)}>Savings Advice</button>
      <SwapGraph />
    </>
  );
}

export default App;
