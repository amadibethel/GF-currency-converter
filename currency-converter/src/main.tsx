// main.tsx

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
    <section>
      <div className="main-container">
        <div className="left-container">
          <div className="title-header">
            <h2>Currency Converter</h2>
          </div>

          <div className="converter">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="amount">Enter amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  autoFocus
                />
              </div>

              <div className="exchange">
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
              </div>

              <div className="rate">
                <p>{result || "Enter amount and select currencies"}</p>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Fetching..." : "Get Exchange Rate"}
              </button>
            </form>
          </div>
        </div>

        <div className="right-container">
          <div className="image-container">
            <img src="/assets/Financial-market.png" alt="display" />
          </div>
          <h2>GF Currency Converter</h2>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <Converter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
