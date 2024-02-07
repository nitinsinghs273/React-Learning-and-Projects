import React, { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="main">
      <SecondCounter />
    </div>
  );
}

function SecondCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const dates = new Date();
  dates.setDate(dates.getDate() + count);
  function handleReset(e) {
    setStep(1);
    setCount(0);
  }

  return (
    <div className="Counter">
      <div className="rangeStep">
        <input
          type="range"
          min={0}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>
      <div className="secondCounter">
        <button onClick={() => setCount((s) => s - step)}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((s) => s + step)}>+</button>
      </div>
      <div className="ThirdCounter">
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} Days from Today is `
            : `${Math.abs(count)} Days ago was `}
        </span>
        <span>{dates.toDateString()}</span>
      </div>
      {count !== 0 || step !== 1 ? (
        <div className="Reset">
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
