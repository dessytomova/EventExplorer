import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/likes';

export const create = async (data) => {

    const response = await request.post(baseUrl, data);
    return await response;
};

// export const getOneByUserId = async(id, userId) => {
//     const query = new URLSearchParams({
//         where: `_ownerId="${userId}"`
//     });
//     return await request.get(`${baseUrl}?${query}%20AND%20eventId%3D%22${id}%22`);
// }

export const getAllByUserId = async(userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`
    });
    return await request.get(`${baseUrl}?${query}`);
}

export const remove = async (id) => await request.del(`${baseUrl}/${id}`);