const date = new Date();

const hour = date.getHours();
const minutes = date.getMinutes();
const formattedMinutes = minutes.toString().padStart(2, '0');
const day = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear();

const currentDate = `${hour}:${formattedMinutes} - ${day}/${month}/${year}`;

export default currentDate;