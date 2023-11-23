import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/jsonstore/events';

export const getAll = async () => {
    const data = await request.get(baseUrl);
    return Object.values(data);
};

export const getOne = async (id) => {
    return await request.get(`${baseUrl}/${id}`);
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
        imageUrl: data.imageUrl,
        ticketInfo: {
            purchaseOptions: [],
            purchaseLink: data.purchaseLink
        }
    }

    if (data.online) body.ticketInfo.purchaseOptions.push('Online');
    if (data.onGate) body.ticketInfo.purchaseOptions.push('On Gate');
    if (data.price) body.ticketInfo.price = data.price;

    const response = await request.post(baseUrl, body);
    return await response;
};
