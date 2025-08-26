export default function ConversionResult({ amount, fromCurrency, toCurrency, converted }) {
  return (
    <div className="text-center">
      <p className="text-lg">
        {amount} {fromCurrency} ={" "}
        <span className="font-bold">
          {converted} {toCurrency}
        </span>
      </p>
    </div>
  );
}
