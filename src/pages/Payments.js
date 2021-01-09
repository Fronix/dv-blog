import React, {useState} from 'react'
import { Loader } from '../components';
import Checkbox from '../components/Checkbox';
import { updatePayment, useGetAllPayments } from '../utils/payments';
import useSWR, { mutate } from 'swr';
import getMonth from '../utils/date';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Payments = () => {
  const { data: payments, error, mutate } = useSWR('https://darthvader.fronix.se/api/payment/users', fetcher)
  
  const TABLE_HEADER = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
]

const handleCheckboxChange = async (event, userId, month) => {
  let updatedPayments = [...payments];
  const user = payments.find(u => u.id === userId);
  const currentUserPayments = payments.find(u => u.id === userId).payments;

  let updatedUserPayments = [...currentUserPayments];
  const monthIndex = updatedUserPayments.findIndex(p => p.month === month);
  updatedUserPayments[monthIndex] = {...updatedUserPayments[monthIndex], paid: !updatedUserPayments[monthIndex].paid}
  
  const updatedUser = {
    ...user,
    payments: updatedUserPayments
  }

  const userIndex = payments.findIndex(p => p.id === userId);
  updatedPayments[userIndex] = {...updatedUser};
  await updatePayment(userId, updatedUser);

  mutate(updatedPayments) //Update local SWR copy of payments for an "instant change" feel
}
  
  if(error) {
    return (
      <div>
        <h1>Error fetching payments</h1>
        <p>{JSON.stringify(error)}</p>
      </div>
    )
  }
 
  if(!payments) {
    return <Loader />
  }

  return (
    <div className="st_wrap_table" data-table_id="0">
    <header className="st_table_header">
      <h2>Darthvader 2021 - {getMonth()}</h2>
      <div className="st_row">
        <div className="st_column _months">Name</div>
        {TABLE_HEADER.map(m => (
          <div key={m} className="st_column _months">{m}</div>
        ))}
      </div>
    </header>
    <div className="st_table">
        {payments.map((user, id) => (
          <UserRow user={user} handleCheckboxChange={handleCheckboxChange} />
        ))}
    </div>
  </div>
  )
}

const UserRow = ({user, handleCheckboxChange}) => {
  return (
    <div key={`${user.name}-${user.id}`} className="st_row">
      <div key={user.name} className="st_column _tableNames">{user.name}</div>
      {user.payments.map((p) => (
        <UserPaymentCheckbox userId={user.id} paid={p.paid} month={p.month} onChange={handleCheckboxChange} />
      ))}
  </div>
  )
}

const UserPaymentCheckbox = ({userId, paid, month, onChange}) => {

  return (
    <div key={`${userId}`} className="st_column _checkboxes">
    <Checkbox
      checked={paid}
      onChange={(ev) => onChange(ev, userId, month)}
    />
  </div>
  )
}

export default Payments
