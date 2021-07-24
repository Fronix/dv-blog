import React, { useState } from 'react';

const UpdatePrice = ({ updatePrice, togglePopup }) => {
    const  [ currPricePer, setPrice ] = useState(null);
    const  [ totalPriceUsd, setTotalPrice ] = useState(null);

    const onChange = (ev) => {
        if(ev.target.name === 'price') {
            const val = Number(ev.target.value);
            if(!Number.isInteger(val)) {
                return;
            }
            setPrice(val)
        }

        if(ev.target.name === 'totalPrice') {
            const val = Number(ev.target.value);
            if(!Number.isInteger(val)) {
                return;
            }
            setTotalPrice(val)
        }

    }

    const payload = {
        ...(currPricePer && {
            currPricePer
        }),
        ...(totalPriceUsd && {
            totalPriceUsd
        })
    };
    const noop = (e) => e.preventDefault();
    return (
        <div className='popup'>
            <div className='popup_inner'>
            <form onSubmit={noop}>
                <h3>Update price</h3>
                <label htmlFor="name">New price:</label>
                <input autoFocus type='number' name='price' id='price' onChange={onChange} value={currPricePer} /> <br />
                <label htmlFor="name">New total price (in USD):</label>
                <input autoFocus type='number' name='totalPrice' id='totalPrice' onChange={onChange} value={totalPriceUsd}/> <br />
            <button onClick={() => updatePrice(payload)} type='submit'>Save</button>
            <button onClick={togglePopup}>Close</button>
            </form>
            </div>
        </div>
    )
}

const isNumber = (val) => typeof val === 'number';

export default UpdatePrice;