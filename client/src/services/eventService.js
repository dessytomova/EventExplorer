import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/events';
const currentDate = new Date();
const currentDateString = currentDate.toISOString().slice(0, 10);

const buildRequestBody = (data) => {
    return {
        name: data.name,
        description: data.description,
        datetime: data.datetime,
        host: data.host,
        country:data.country, 
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber,
        imageUrl: data.imageUrl,
        ticketInfo: {
            purchaseOptions: [],
            purchaseLink: data.purchaseLink, 
            price: data.price
        }
    }
}

export const getAll = async () => {
    const data = await request.get(baseUrl);
    return data;
};

export const getAllActive = async () => {
    const query = new URLSearchParams({
        where: `datetime>"${currentDateString}"`
    });

    const result = await request.get(`${baseUrl}?${query}&sortBy=datetime`);
    return result;
};

export const getOne = async (id) => {
    return await request.get(`${baseUrl}/${id}`);
};

export const getByOwner = async (ownerId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${ownerId}"`
    });

    //return await request.get(`${baseUrl}?${query}%20AND%20datetime%3E%22${currentDateString}%22&sort=datetime`);
    return await request.get(`${baseUrl}?sortBy=datetime&${query}`);
};

export const getByFilter = async (filter) => {
    //return await request.get(`${baseUrl}?where=name%20LIKE%20"${filter}"%20OR%20description%20LIKE%20"${filter}"%20OR%20host%20LIKE%20"${filter}"%20OR%20city%20LIKE%20"${filter}"`);                                                       
        
    //filter active events because i cannot filter them on the practise server properly
    const result = await request.get(`${baseUrl}?where=name%20LIKE%20"${filter}"%20OR%20description%20LIKE%20"${filter}"%20OR%20host%20LIKE%20"${filter}"%20OR%20city%20LIKE%20"${filter}"`);                                                       
    return result.filter(event => event.datetime > currentDateString);
            
};

export const getNearest = async (pageSize) => {
    const query = new URLSearchParams({
        where: `datetime>"${currentDateString}"`,
        offset: 0, 
        pageSize: pageSize
    });

    const result = await request.get(`${baseUrl}?sortBy=datetime&${query}`);

    return result;
}



export const create = async (data) => {
   
    const body = buildRequestBody(data);

    if (data.online) body.ticketInfo.purchaseOptions.push('Online');
    if (data.onGate) body.ticketInfo.purchaseOptions.push('On Gate');

    const response = await request.post(baseUrl, body);
    return await response;
};

export const edit = async (id, data) => {
    const body = buildRequestBody(data);

    if (data.online) body.ticketInfo.purchaseOptions.push('Online');
    if (data.onGate) body.ticketInfo.purchaseOptions.push('On Gate');

    const result = await request.put(`${baseUrl}/${id}`, body);
    return result;
}

export const remove = async (id) => await request.del(`${baseUrl}/${id}`);