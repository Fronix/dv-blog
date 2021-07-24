const currencyConvertApiKey = '96c970bfaf2ca70346f9e56f';
export const currencyApiUrl = `https://v6.exchangerate-api.com/v6/${currencyConvertApiKey}/pair/USD/SEK`;

const GetUsdSekRate = () => fetch(`${currencyApiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

export default GetUsdSekRate;