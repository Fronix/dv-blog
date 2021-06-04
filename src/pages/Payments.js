import React, {useState} from 'react'
import { AddUserPayment, DeleteIcon, Loader } from '../components';
import Checkbox from '../components/Checkbox';
import { updatePayment, paymentApiUrl, addPaymentUser, deletePaymentUser } from '../utils/payments';
import useSWR from 'swr';
import getMonth from '../utils/date';
import { generateUser } from '../utils/payments/addPaymentUser';
import PauseIcon from '../components/PauseIcon';
import PlayIcon from '../components/PlayIcon';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Payments = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const { data: payments, error, mutate } = useSWR(`${paymentApiUrl}/users`, fetcher)

  const TABLE_HEADER = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
]

const toggleShowAddUser = () => setShowAddUser(!showAddUser);

const addUser = async (name) => {
  const newId = payments.map(x => x.id).reduce((m, c) => c > m ? c : m) + 1;
  const newUser = generateUser(newId, name);
  const updatedPayments = [...payments, newUser];
  await addPaymentUser(newUser);
  mutate(updatedPayments) //Update local SWR copy of payments for an "instant change" feel
  toggleShowAddUser();
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
  updatedUserPayments[monthIndex] = {...updatedUserPayments[monthIndex], paid: event.target.value}
  
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
    <div className="payments_wrap">
    <div className="st_wrap_table" data-table_id="0">
    <header className="st_table_header">
      <h2>Darthvader 2021 - {getMonth()}</h2>
      <div className="st_row">
        <div className="st_column _names">Name</div>
        {TABLE_HEADER.map(m => (
          <div key={m} className={`st_column _months ${m === getMonth().substr(0,3) ? 'warning' : ''}`}>{m}</div>
        ))}
      </div>
    </header>
    <div className="st_table">
        {payments.map((user, id) => (
          <UserRow key={`${user.name}-${id}`} user={user} handleCheckboxChange={handleCheckboxChange} deleteUser={deleteUser} pauseUser={pauseUser}/>
        ))}
    </div>
  </div>
  <button onClick={toggleShowAddUser}>Add user</button>
  {showAddUser && (
    <AddUserPayment addUser={addUser} togglePopup={toggleShowAddUser} />
  )}
  </div>
  )
}

const UserRow = ({user, handleCheckboxChange, deleteUser, pauseUser}) => {
  return (
    <div key={`${user.name}-${user.id}`} className={`st_row`}>
      <div key={user.name} className={`st_column _tableNames  ${user.paused ? 'paused' : ''}`}>{user.paused && <PauseIcon />} {user.name}</div>
      {user.payments.map((p) => (
        <UserPaymentCheckbox key={`${user.name}-${user.id}-${p.month}`} userId={user.id} paid={p.paid} month={p.month} onChange={handleCheckboxChange} />
      ))}
      <div className="st_column _actions">
        <div style={{ paddingRight: '15px'}} onClick={() => deleteUser(user.id)}>
          <DeleteIcon />
        </div>
        <div onClick={() => pauseUser(user.id)}>
          {user.paused && <PauseIcon size='26px' />}
          {!user.paused && <PlayIcon size='26px' />}
        </div>
      </div>
  </div>
  )
}

const UserPaymentCheckbox = ({userId, paid, month, onChange}) => {

  return (
    <div key={`${userId}-${month}`} className="st_column _checkboxes">
      <Checkbox value={paid} onChange={(ev) => onChange(ev, userId, month)} />
  </div>
  )
}

export default Payments
