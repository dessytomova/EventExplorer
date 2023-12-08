import * as request from "../lib/request";
import { getCurrentDate } from "../utils/dateUtils";

const baseUrl = 'http://localhost:3030/data/likes';
const currentDateString = getCurrentDate();

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

export const getAllLikedFiltered = async (ownerId, filter) => {
    const query = new URLSearchParams({
        load: `event=eventId:events`,
        where: `_ownerId="${ownerId}"`, 
    });
    
    //filter active events because i cannot filter them on the practise server properly
    let result = await request.get(`${baseUrl}?${query}`);
    filter = filter.trim().toLowerCase();

    return result.filter(like => {
        const nameIncludesTerm = like.event.name.toLowerCase().includes(filter);
        const descriptionIncludesTerm = like.event.description.toLowerCase().includes(filter);
        const hostIncludesTerm = like.event.host.toLowerCase().includes(filter);
        const citytIncludesTerm = like.event.city.toLowerCase().includes(filter);
        
        return (like.event.datetime > currentDateString) && (nameIncludesTerm || descriptionIncludesTerm || hostIncludesTerm || citytIncludesTerm);
    });
}

export const remove = async (id) => await request.del(`${baseUrl}/${id}`);