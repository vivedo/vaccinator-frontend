import globals from "../globals";
import {getFetchOptions} from "./serviceUtils";

export const getListings = auth => {
    return fetch(`${globals.API_URL}/listings`, getFetchOptions(auth))
        .then(res => res.json())
        .then(res => {
            if(res.status)
                return res.data.map(l => ({
                    ...l,
                    insertion_date: new Date(l.insertion_date)
                }))
            else
                throw new Error(res.message)
        })
}

export const getListing = (listingId, auth) => {
    return fetch(`${globals.API_URL}/listings/${listingId}`, getFetchOptions(auth))
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                return {
                    ...res.data,
                    insertion_date: new Date(res.data.insertion_date)
                }
            }
        })
}

export const getListingsStats = auth => {
    return fetch(`${globals.API_URL}/listings/stats`, getFetchOptions(auth))
        .then(res => res.json())
        .then(res => {
            if(res.status)
                return res.data
            else
                throw new Error(res.message)
        })
}

export const getListingsAndStats = auth => {
    return Promise.all([getListings(auth), getListingsStats(auth)])
        .then(res => ({listings: res[0], stats: res[1]}))
}