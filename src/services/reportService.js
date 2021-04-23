import globals from "../globals";
import {getFetchOptions} from "./serviceUtils";


export const uploadReport = (data, auth) => {
    return fetch(`${globals.API_URL}/upload-report`, getFetchOptions(auth, 'POST', data))
        .then(res => res.json())
}