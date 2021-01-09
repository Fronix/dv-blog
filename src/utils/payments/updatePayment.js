const updatePayment = (id, data) => fetch(`https://darthvader.fronix.se/api/payment/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default updatePayment;