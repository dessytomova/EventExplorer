import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/events';

const buildRequestBody = (data) => {
    return {
        name: data.name,
        description: data.description,
        datetime: data.datetime,
        host: data.host,
        address: {
            country: data.country,
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber,
        },
        imageUrl: data.imageUrl,
        ticketInfo: {
            purchaseOptions: [],
            purchaseLink: data.purchaseLink
        }
    }
}

export const getAll = async () => {
    const data = await request.get(baseUrl);
    return data;
};

export const getOne = async (id) => {
    return await request.get(`${baseUrl}/${id}`);
};

export const getByOwner = async (ownerId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${ownerId}"`
    });

    return await request.get(`${baseUrl}?${query}`);
};

export const getByFilter = async (filter) => {
    return await request.get(`${baseUrl}?where=name%20LIKE%20"${filter}"%20OR%20description%20LIKE%20"${filter}"%20OR%20%20host%20LIKE%20"${filter}"`);
};


export const create = async (data) => {
   
    const body = buildRequestBody(data);

    if (data.online) body.ticketInfo.purchaseOptions.push('Online');
    if (data.onGate) body.ticketInfo.purchaseOptions.push('On Gate');
    if (data.price) body.ticketInfo.price = data.price;

    const response = await request.post(baseUrl, body);
    return await response;
};

export const edit = async (id, data) => {
    const body = buildRequestBody(data);

    if (data.online) body.ticketInfo.purchaseOptions.push('Online');
    if (data.onGate) body.ticketInfo.purchaseOptions.push('On Gate');
    if (data.price) body.ticketInfo.price = data.price;

    const result = await request.put(`${baseUrl}/${id}`, body);
    return result;
}

export const remove = async (id) => await request.del(`${baseUrl}/${id}`);