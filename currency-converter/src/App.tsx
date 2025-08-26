import { useEffect, useState, useCallback } from "react";
import { fetchRates } from "./services/api";
import type { RatesResponse } from "./services/api";
import CurrencySelector from "./components/CurrencySelector";
import AmountInput from "./components/AmountInput";
import ConversionResult from "./components/ConversionResult";

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [converted, setConverted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data: RatesResponse = await fetchRates(fromCurrency);

      if (!data || !data.conversion_rates) {
        throw new Error("Invalid API response");
      }

      setRates(data.conversion_rates);
      setCurrencies(Object.keys(data.conversion_rates));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [fromCurrency]);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  useEffect(() => {
    if (rates && toCurrency && amount > 0) {
      const rate = rates[toCurrency];
      if (rate) setConverted((amount * rate).toFixed(2));
      else {
        setConverted(null);
        setError(`Rate for ${toCurrency} not found`);
      }
    } else setConverted(null);
  }, [amount, toCurrency, rates]);

  const handleAmountChange = (value: number) => {
    if (value < 0) {
      setError("Amount cannot be negative");
      setAmount(0);
    } else {
      setError(null);
      setAmount(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">💱 Currency Converter</h1>

      {loading ? (
        <p>Loading exchange rates...</p>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <button
            onClick={loadRates}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
          <AmountInput amount={amount} setAmount={handleAmountChange} />
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
