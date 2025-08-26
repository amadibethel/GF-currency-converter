interface Props {
  currencies: string[];
  selected: string;
  onChange: (value: string) => void;
  label: string;
}

export default function CurrencySelector({ currencies, selected, onChange, label }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
