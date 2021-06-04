import { paymentApiUrl } from '.'

const updatePayment = (id, data) => fetch(`${paymentApiUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default updatePayment;