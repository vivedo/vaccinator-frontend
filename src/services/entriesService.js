import globals from "../globals";
import {getFetchOptions} from "./serviceUtils";

export const getEntries = (listingId, auth) => {
    return fetch(`${globals.API_URL}/listings/${listingId}/entries`, getFetchOptions(auth))
        .then(res => res.json())
        .then(res => {
            if(res.status)
                return res.data.map(entry => ({
                    ...entry,
                    scanned: !!(+entry.scanned)
                }))
            else
                throw new Error(res.message)
        })
}

export const scanEntry = (entryId, auth) => {
    return fetch(`${globals.API_URL}/entries/${entryId}/scan`, getFetchOptions(auth, 'POST'))
        .then(res => res.json())
        .then(res => {
            if (res.status)
                return res
            else
                throw new Error(res.message)
        })
}