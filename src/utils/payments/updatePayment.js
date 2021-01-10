import { paymentApiUrl } from '.'

const updatePayment = (id, data) => fetch(`${paymentApiUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default updatePayment;