const dateInPast = function(firstDate, secondDate) {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
  
    return false;
  };

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const twelve = [...Array(12)]
const createMonthDates = () => twelve.map((x, i) => {
    const date = new Date(new Date().setMonth(i));
    return { date, name: monthNames[date.getMonth()].substr(0,3)}
})

export { createMonthDates, dateInPast }