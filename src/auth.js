import React, {createContext, useContext} from "react";
import globals from './globals';
import {useSessionStorage} from "./persistentstorages";

const authContext = createContext()

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useSessionStorage('auth', null);

    const signin = (data, cb) => {
        if(typeof cb !== 'function') cb = () => {}

        fetch(`${globals.API_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {

                if(!res.status)
                    return cb({
                        success: false,
                        error: {
                            code: 'LOGIN_ERROR',
                            detail: res.message
                        }
                    })

                setUser(res.data);

                cb({
                    success: true,
                    user: res.data
                })

            }).catch(err => {
            cb({
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    detail: err
                }
            })
        })

    };

    const signout = cb => {
        if(typeof cb !== 'function') cb = () => {}

        setUser(null)
        cb()
    }

    return {
        user,
        signin,
        signout
    }
}