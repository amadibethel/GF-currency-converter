interface Props {
  amount: number;
  setAmount: (value: number) => void;
}

export default function AmountInput({ amount, setAmount }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
}
