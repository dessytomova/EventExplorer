import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/likes';

export const create = async (data) => {

    const response = await request.post(baseUrl, data);
    return await response;
};


export const getAllByUserId = async(userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`
    });
    return await request.get(`${baseUrl}?${query}`);
}


export const getAllLiked = async (ownerId) => {
    const query = new URLSearchParams({
        load: `event=eventId:events`,
        where: `_ownerId="${ownerId}"`
    });
    
    return await request.get(`${baseUrl}?${query}`);;
}


export const remove = async (id) => await request.del(`${baseUrl}/${id}`);