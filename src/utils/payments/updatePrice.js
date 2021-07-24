import { paymentApiUrl } from '.'

const updatePrice = (data) => fetch(`${paymentApiUrl}/price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default updatePrice;