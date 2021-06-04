import React from 'react'

const paidEnums = {
  1: 'paid',
  2: 'unpaid',
}

const Checkbox = ({value, onChange}) => {
  const onClick = (e) => {
    e.preventDefault();
    if(value === 2) {
      e.target.value = 1
      onChange(e)
    } else {
      e.target.value = 2
      onChange(e)
    }
  }

  return (
    <button onClick={onClick} className={`threeStateCheckbox ${paidEnums[value]}`}>
    {value === 1 && (
      <Positive />
    )}
    {value === 2 && (
      <Negative />
    )}
    </button>
  );
};

const Positive = () => (
<svg id="i-checkmark" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.9375%"><path d="M2 20 L12 28 30 4" /></svg>
)

const Negative = () => (
<svg id="i-close" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.9375%"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
)

export default Checkbox;