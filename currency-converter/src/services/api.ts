const API_KEY = "bb86505dcedabdc7989e1e7e"; // Your ExchangeRate API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export type RatesResponse = {
  conversion_rates: Record<string, number>;
};

export async function fetchRates(baseCurrency: string): Promise<RatesResponse> {
  const response = await fetch(`${BASE_URL}${baseCurrency}`);
  if (!response.ok) throw new Error("Failed to fetch exchange rates");
  return response.json();
}
