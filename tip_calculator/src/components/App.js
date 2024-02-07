import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div>
      <BillCalculate />
    </div>
  );
}

function BillCalculate() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = (bill * ((percentage1 + percentage2) / 2)) / 100;

  function ResetButton() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className="components">
      <Billing bill={bill} onSetBill={setBill} />

      <Satisfaction percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </Satisfaction>

      <Satisfaction percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </Satisfaction>

      {bill > 0 && (
        <>
          <Result bill={bill} tip={tip} />
          <Reset onclick={ResetButton} />
        </>
      )}
    </div>
  );
}

function Billing({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the Bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Satisfaction({ percentage, onSelect, children }) {
  return (
    <div>
      <label>{children}</label>
      <select onChange={(e) => onSelect(Number(e.target.value))}>
        <option value={0}>Dissatisfied ({0}%)</option>
        <option value={5}>it was okay ({5}%)</option>
        <option value={10}>it was good ({10}%)</option>
        <option value={20}>Absolutely amazing! ({20}%)</option>
      </select>
    </div>
  );
}

function Result({ bill, tip }) {
  return (
    <h3>
      You have to pay ${bill + tip} (${bill} +${tip} tip){" "}
    </h3>
  );
}

function Reset({ onclick }) {
  return <button onClick={onclick}>Reset</button>;
}
