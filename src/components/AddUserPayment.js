import React, { useState } from 'react';

const AddUserPayment = ({ addUser, togglePopup }) => {
    const  [ name, setName ] = useState(null);

    const onChange = (ev) => setName(ev.target.value)
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h3>Add user</h3>
                <label htmlFor="name">Name:</label>
                <input type='text' name='name' id='name' onChange={onChange} /> <br />
            <button onClick={() => addUser(name)} disabled={!name}>Save</button>
            <button onClick={togglePopup}>Close</button>
            </div>
        </div>
    )
}

export default AddUserPayment;