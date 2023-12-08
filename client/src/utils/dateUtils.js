export const formatDate = (isoDate) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZoneName: 'short'
    };

    return new Date(isoDate).toLocaleDateString(undefined, options);
};

export const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
