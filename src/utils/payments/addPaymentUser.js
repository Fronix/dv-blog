import { paymentApiUrl } from ".";

export const generateUser = (id, name) => {
  const currYear = (new Date()).getFullYear();
    return {
        id,
        name,
        payments: [
          {
            month: "Jan",
            paid: 2,
            date: `${currYear}-01-30T23:00:00.000Z`
          },
          {
            month: "Feb",
            paid: 2,
            date: `${currYear}-02-27T23:00:00.000Z`
          },
          {
            month: "Mar",
            paid: 2,
            date: `${currYear}-03-30T22:00:00.000Z`
          },
          {
            month: "Apr",
            paid: 2,
            date: `${currYear}-04-29T22:00:00.000Z`
          },
          {
            month: "May",
            paid: 2,
            date: `${currYear}-05-30T22:00:00.000Z`
          },
          {
            month: "Jun",
            paid: 2,
            date: `${currYear}-06-29T22:00:00.000Z`
          },
          {
            month: "Jul",
            paid: 2,
            date: `${currYear}-07-30T22:00:00.000Z`
          },
          {
            month: "Aug",
            paid: 2,
            date: `${currYear}-08-30T22:00:00.000Z`
          },
          {
            month: "Sep",
            paid: 2,
            date: `${currYear}-09-29T22:00:00.000Z`
          },
          {
            month: "Oct",
            paid: 2,
            date: `${currYear}-10-30T22:00:00.000Z`
          },
          {
            month: "Nov",
            paid: 2,
            date: `${currYear}-11-29T23:00:00.000Z`
          },
          {
            month: "Dec",
            paid: 2,
            date: `${currYear}-12-30T23:00:00.000Z`
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