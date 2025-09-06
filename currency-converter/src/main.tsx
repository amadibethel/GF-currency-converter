// main.tsx

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Currency Converter Component

function Converter() {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
      );
      const data = await res.json();

      if (data && data.result) {
        setResult(`${amount} ${from} = ${data.result.toFixed(2)} ${to}`);
      } else {
        setResult("⚠️ Unable to fetch conversion rate. Try again later.");
      }
    } catch (error) {
      setResult("⚠️ Error fetching conversion rates!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="converter-container">
      <h1>GF Currency Converter</h1>
      <form onSubmit={handleSubmit} className="converter-form">
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <label>From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
            <option value="ZAR">ZAR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label>To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
            <option value="ZAR">ZAR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Convert"}
        </button>
      </form>
      {result && <p className="result">{result}</p>}
    </div>
  );
}

// Main App
function App() {
  return (
    <div className="App">
      <Converter />
    </div>
  );
}

// Mount App
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
