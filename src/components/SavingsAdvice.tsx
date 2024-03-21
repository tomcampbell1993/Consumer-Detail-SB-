import data from "../../data/data.json";
import spendingCodes from "../assets/SpendingCodes";
import { useState } from "react";

export default function SavingsAdvice() {
  const dataMap = data.reduce((acc, current) => {
    const category = current.recipient.mcc;
    const amount = parseFloat(current.amount);
    const key = (spendingCodes as { [k: string]: string })[category];

    if (key in acc) {
      acc[key] += amount;
    } else {
      acc[key] = amount;
    }
    acc[key] = Number(acc[key].toFixed(2));
    return acc;
  }, {} as { [k: string]: number });

  const dataMapMerchant = data.reduce((acc, current) => {
    const merchantName = current.recipient.name;
    const amount = parseFloat(current.amount);

    if (merchantName in acc) {
      acc[merchantName] += amount;
    } else {
      acc[merchantName] = amount;
    }
    acc[merchantName] = Number(acc[merchantName].toFixed(2));
    return acc;
  }, {} as { [k: string]: number });

  const topCategoriesAndAmount = Object.entries(dataMap).sort(
    (a, b) => b[1] - a[1]
  );

  const topCategory = topCategoriesAndAmount.map((el) => el[0]).slice(0, 1);

  const topAmount = topCategoriesAndAmount.map((el) => el[1]).slice(0, 1);

  const topMerchantAndAmount = Object.entries(dataMapMerchant).sort(
    (a, b) => b[1] - a[1]
  );

  const topMerchant = topMerchantAndAmount.map((el) => el[0]).slice(0, 1);

  const [customerInput, setCustomerInput] = useState<string>("");
  const [cheap, setCheap] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInput(e.target.value);
    if (Number(e.target.value) < 1000 && e.target.value != "") {
      setCheap(true);
    } else {
      setCheap(false);
    }
  };

  return (
    <>
      <h1>Savings goals</h1>
      <p>What is you wanting to save!? in pund for this year </p>
      <input type="number" onChange={(e) => onChange(e)}></input>
      {cheap ? <span id="cheap-message" className="cheap-message"> Stop being cheap!</span> : null}
      <p>
        To achieve your savings goal you need to save £
        <b>{Number(customerInput) / 8}</b> per Month.
      </p>
      <p>
        You are spending the most money on <b>{topCategory}</b>
      </p>
      <p>
        The money you are spending on <b>{topCategory}</b> is <b>{topAmount}</b>
      </p>
      <p>
        You are buying mostly from <b>{topMerchant}</b>
      </p>
    </>
  );
}
