export const getFetchOptions = (auth, method = 'GET', body) => {
    return {
        headers: {
            'Authorization': `Bearer ${auth.user.token}`
        },
        method,
        body
    }
}