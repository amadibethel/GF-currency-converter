export default function AmountInput({ amount, setAmount }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
}
