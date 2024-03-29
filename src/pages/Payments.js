import React, {useCallback, useState} from 'react'
import { AddUserPayment, DeleteIcon, Loader, UpdatePrice } from '../components';
import Checkbox from '../components/Checkbox';
import { updatePayment, paymentApiUrl, addPaymentUser, deletePaymentUser, updatePrice as apiUpdatePrice } from '../utils/payments';
import useSWR from 'swr';
import { createMonthDates, dateInPast } from '../utils/date';
import { generateUser } from '../utils/payments/addPaymentUser';
import PauseIcon from '../components/PauseIcon';
import PlayIcon from '../components/PlayIcon';
import { currencyApiUrl } from '../utils/payments/currencyRate';



const fetcher = (...args) => fetch(...args).then(res => res.json())

const Payments = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdatePrice, setShowUpdatePrice] = useState(false);
  const { data: payments, error, mutate } = useSWR(`${paymentApiUrl}/users`, fetcher)
  const { data: price, error: priceError, mutate: priceMutate } = useSWR(`${paymentApiUrl}/price`, fetcher)
  const { data: rate, error: rateError } = useSWR(currencyApiUrl, fetcher)

  const TABLE_HEADER = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];

const toggleShowAddUser = () => setShowAddUser(!showAddUser);
const toggleShowUpdatePrice = () => setShowUpdatePrice(!showUpdatePrice);

const addUser = async (name) => {
  const newId = payments.map(x => x.id).reduce((m, c) => c > m ? c : m) + 1;
  const newUser = generateUser(newId, name);
  const updatedPayments = [...payments, newUser];
  await addPaymentUser(newUser);
  mutate(updatedPayments) //Update local SWR copy of payments for an "instant change" feel
  toggleShowAddUser();
}

const updatePrice = async (newPrices) => {
  const newData = {
    ...price,
    ...newPrices
  }

  console.log('newData:', newData)
  await apiUpdatePrice(newData)
  priceMutate(newData);
  toggleShowUpdatePrice();
}

const deleteUser = async (id) => {
  let updatedPayments = [...payments];
  updatedPayments.filter(p => p.id !== id);

  await deletePaymentUser(id);
  mutate(updatedPayments) //Update local SWR copy of payments for an "instant change" feel
}

const pauseUser = async (id) => {
  let updatedPayments = [...payments];

  const user = payments.find(u => u.id === id);
  const updatedUser = {
    ...user,
    paused: !user.paused
  }
  await updatePayment(id, updatedUser);

  const userIndex = payments.findIndex(p => p.id === id);
  updatedPayments[userIndex] = {...updatedUser};

  mutate(updatedPayments);
}

const handleCheckboxChange = async (event, userId, month) => {
  let updatedPayments = [...payments];
  const user = payments.find(u => u.id === userId);
  const currentUserPayments = payments.find(u => u.id === userId).payments;

  let updatedUserPayments = [...currentUserPayments];
  const monthIndex = updatedUserPayments.findIndex(p => p.month === month);
  updatedUserPayments[monthIndex] = {...updatedUserPayments[monthIndex], paid: Number(event.target.value)}
  
  const updatedUser = {
    ...user,
    payments: updatedUserPayments
  }

  const userIndex = payments.findIndex(p => p.id === userId);
  updatedPayments[userIndex] = {...updatedUser};
  await updatePayment(userId, updatedUser);

  mutate(updatedPayments) //Update local SWR copy of payments for an "instant change" feel
}

const getMonthlyTotal = useCallback(
  () => {
    const { currPricePer } = price;
    const activeUsers = payments.filter(x => !x.paused).length;

    return currPricePer * activeUsers;
  },
  [payments, price],
);

if(error || priceError) {
  return (
    <div>
        <h1>Error fetching payments</h1>
        <p>{JSON.stringify(error)}</p>
      </div>
    )
  }
  
  if(!payments || !price) {
    return <Loader />
  }
  
  const sortedPayments = payments.sort((a, b) => {
    return Number(a.paused) - Number(b.paused)
  });
  
  const today = new Date();
  const months = createMonthDates();
  const convertedPrice = rate ? Math.floor(price.totalPriceUsd * rate.conversion_rate) : 0;
  return (
    <div className="payments_wrap">
      {!!rateError && (<div>Error getting USD/SEK conversion rate</div>)}
    <header className="st_table_header">
      <div className='payment_header_flex'>
        <div className='payment_header_flex_item'>
          <h2>Darthvader 2021 - {months.find(m => m.date.getMonth() === today.getMonth()).name}</h2>
        </div>
        <div className='payment_header_flex_item align_right curr_price'>
          <span>Current price: {price.currPricePer || ''}kr</span>
          <span>Total: {getMonthlyTotal()}kr / {convertedPrice}kr</span>
          <span>Diff: {convertedPrice - getMonthlyTotal()}kr</span>
        </div>
      </div>
    </header>
    <div style={{ overflowX: 'scroll'}}>
      <table>
        <thead>
          <tr>
          <th>
            Namn
          </th>
          {months.map(m => {
            const isToday = m.date.getMonth() === today.getMonth();
            return (
              <th key={m.name} className={`_months ${isToday ? 'warning' : ''}`}>
                {m.name}
              </th>
            )
          })}
          </tr>
          </thead>
          <tbody>
            {sortedPayments.map((user, id) => {
              return <UserRow key={`${user.name}-${id}`} user={user} handleCheckboxChange={handleCheckboxChange} deleteUser={deleteUser} pauseUser={pauseUser}/>
            })}
          </tbody>
      </table>
    </div>
  <div>
    <button onClick={toggleShowAddUser}>Add user</button>
    <button onClick={toggleShowUpdatePrice}>Update price</button>
  </div>
  {showAddUser && (
    <AddUserPayment addUser={addUser} togglePopup={toggleShowAddUser} />
  )}
  {showUpdatePrice && (
    <UpdatePrice updatePrice={updatePrice} togglePopup={toggleShowUpdatePrice} />
  )}
  </div>
  )
}

const UserRow = ({user, handleCheckboxChange, deleteUser, pauseUser}) => {
  const today = new Date();
  return (
      <tr>
        <th key={`${user.name}-${user.id}`}>
          <div key={user.name} className={`${user.paused ? 'paused' : ''} _actions`}>
              {user.name}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            <div style={{ paddingRight: '10px'}} onClick={() => deleteUser(user.id)}>
              <DeleteIcon />
            </div>
            <div onClick={() => pauseUser(user.id)}>
              {!user.paused && <PauseIcon size='26px' />}
              {user.paused && <PlayIcon size='26px' />}
            </div>
          </div>
        </th>
        {user.payments.map((p) => <UserPaymentCheckbox disabled={user.paused} key={`${user.name}-${user.id}-${p.month}`} userId={user.id} paid={p.paid} month={p.month} date={p.date} onChange={handleCheckboxChange} />)}
      </tr>
  )
}

const UserPaymentCheckbox = ({userId, paid, month, date, onChange, disabled}) => {
  const today = new Date();
  const isPast = !dateInPast(today, new Date(date));
  
  const disableClick = disabled || isPast

  return (
    <td key={`${userId}-${month}`} className={`${disableClick && 'disabled'}`}>
      <Checkbox 
        disabled={disabled}
        value={Number(paid)}
        onChange={(ev) => onChange(ev, userId, month)}
      />
  </td>
  )
}

export default Payments
