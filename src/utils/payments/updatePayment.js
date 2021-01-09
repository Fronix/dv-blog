const updatePayment = (id, data) => fetch(`https://darthvader.fronix.se/payment-api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default updatePayment;