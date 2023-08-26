const dateFormat = (last_connection) => {
    const [timePart, datePart] = last_connection.split(' - ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const [day, month, year] = datePart.split('/').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
}

export default dateFormat;