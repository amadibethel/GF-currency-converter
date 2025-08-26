import { useEffect, useState } from "react";
import { fetchRates } from "./services/api";
import CurrencySelector from "./components/CurrencySelector";
import AmountInput from "./components/AmountInput";
import ConversionResult from "./components/ConversionResult";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRates() {
      try {
        setLoading(true);
        const data = await fetchRates(fromCurrency);
        setRates(data.conversion_rates);
        setCurrencies(Object.keys(data.conversion_rates));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (rates && toCurrency) {
      setConverted((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">💱 Currency Converter</h1>

      {loading ? (
        <p>Loading rates...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
          <AmountInput amount={amount} setAmount={setAmount} />
          <CurrencySelector
            currencies={currencies}
            selected={fromCurrency}
            onChange={setFromCurrency}
            label="From"
          />
          <CurrencySelector
            currencies={currencies}
            selected={toCurrency}
            onChange={setToCurrency}
            label="To"
          />
          <ConversionResult
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            converted={converted}
          />
        </div>
      )}
    </div>
  );
}

export default App;
