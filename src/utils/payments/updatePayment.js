const updatePayment = (id, data) => fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default updatePayment;