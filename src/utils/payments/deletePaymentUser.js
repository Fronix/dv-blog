import { paymentApiUrl } from ".";

const deletePaymentUser = (id) => fetch(`${paymentApiUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })

export default deletePaymentUser;