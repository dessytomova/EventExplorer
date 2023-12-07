import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/likes';
const currentDate = new Date();
const currentDateString = currentDate.toISOString().slice(0, 10);

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
        where: `_ownerId="${ownerId}"`, 
    });
    
    //filter active events because i cannot filter them on the practise server properly
    let result = await request.get(`${baseUrl}?${query}`)
    return result.filter(like => like.event.datetime > currentDateString);
    //return await request.get(`${baseUrl}?${query}`);
}


export const remove = async (id) => await request.del(`${baseUrl}/${id}`);