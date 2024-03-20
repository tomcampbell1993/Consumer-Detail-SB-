import "./App.css";
import { useState } from "react";
import TotalAmount from "./components/TotalAmount";
import Category from "./components/Category";

function App() {

    const [page, setPage] = useState<number>(0);

    function SwapGraph() {
      if(page === 0){
        return <TotalAmount />
      }
      if(page === 1){
        return <Category />
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
      </div>
      <button onClick={()=>setPage(0)}>Total</button>
      <button onClick={()=>setPage(1)}>Monthly</button>
      <SwapGraph />
    </>
  );
}

export default App;
