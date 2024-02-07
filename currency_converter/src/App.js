import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [converted, setConverted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function Fetch_Convert() {
        setIsLoading(true);
        const data = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const res = await data.json();
        // console.log(res.rates[to]);
        setConverted(Number(res.rates[to]));
        setIsLoading(false);
      }
      if (to === from) return setConverted(amount);
      Fetch_Convert();
    },
    [from, to, amount]
  );
  return (
    <div className="Container">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>
      <div className="result">
        <p>
          {converted} {to}
        </p>
      </div>
    </div>
  );
}
