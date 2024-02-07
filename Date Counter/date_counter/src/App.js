import React, { useState } from "react";

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

  return (
    <div className="Counter">
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div className="second">
        <button onClick={() => setCount((s) => s - step)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount((s) => s + step)}>+</button>
      </div>
      <div>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} Days from Today is `
            : `${Math.abs(count)} Days ago was `}
        </span>
        <span>{dates.toDateString()}</span>
      </div>
    </div>
  );
}
