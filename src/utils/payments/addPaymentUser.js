import { paymentApiUrl } from ".";

export const generateUser = (id, name) => {
    return {
        id,
        name,
        payments: [
          {
            month: "Jan",
            paid: false
          },
          {
            month: "Feb",
            paid: false
          },
          {
            month: "Mar",
            paid: false
          },
          {
            month: "Apr",
            paid: false
          },
          {
            month: "May",
            paid: false
          },
          {
            month: "Jun",
            paid: false
          },
          {
            month: "Jul",
            paid: false
          },
          {
            month: "Aug",
            paid: false
          },
          {
            month: "Sep",
            paid: false
          },
          {
            month: "Oct",
            paid: false
          },
          {
            month: "Nov",
            paid: false
          },
          {
            month: "Dec",
            paid: false
          }
        ]
      }
}

const addPaymentUser = (data) => fetch(`${paymentApiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

export default addPaymentUser;