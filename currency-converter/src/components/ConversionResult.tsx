interface Props {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  converted: string | null;
}

export default function ConversionResult({ amount, fromCurrency, toCurrency, converted }: Props) {
  return (
    <div className="text-center">
      <p className="text-lg">
        {amount} {fromCurrency} ={" "}
        <span className="font-bold">{converted ?? "..." } {toCurrency}</span>
      </p>
    </div>
  );
}
