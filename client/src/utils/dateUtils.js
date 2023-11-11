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