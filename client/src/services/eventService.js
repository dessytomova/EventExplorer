const baseUrl = 'http://localhost:3030/jsonstore/events';

export const getAll = async (prop) => {
    const response = await fetch(baseUrl,prop);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};

export const getOne = async (id, prop) => {
    const response = await fetch(`${baseUrl}/${id}`,prop);
    return await response.json();
};

export const create = async (data) => {
    const body = {
        name: data.name, 
        description: data.description,
        datetime: data.datetime, 
        host: data.host,
        address: {
            country: data.address.country, 
            city: data.address.city, 
            street: data.address.street, 
            streetNumber: data.address.streetNumber,
        }, 
        performingArtists: data.performingArtists.split(',').map(element => element.trim()),
        imageUrl: data.imageUrl
    }

    const response = await fetch(baseUrl, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), 
    });

    return await response.json();
};
