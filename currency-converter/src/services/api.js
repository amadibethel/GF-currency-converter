const API_KEY = "YOUR_API_KEY"; // Replace with your ExchangeRate-API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export async function fetchRates(baseCurrency) {
  try {
    const response = await fetch(`${BASE_URL}${baseCurrency}`);
    if (!response.ok) throw new Error("Failed to fetch exchange rates");
    return await response.json();
  } catch (error) {
    throw error;
  }
}
