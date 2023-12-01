import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/likes';

export const create = async (data) => {

    const response = await request.post(baseUrl, data);
    return await response;
};

export const getOneByUserId = async(id, userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`
    });
    //TODO find a better way to encode
    return await request.get(`${baseUrl}?${query}%20AND%20eventId%3D%22${id}%22`);
}
