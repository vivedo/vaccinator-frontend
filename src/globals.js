const dev = process.env.NODE_ENV === 'development'

const globals = {
    API_URL: dev ? 'http://localhost:3200' : '//api.vaccini.vivedo.me'
}

export default globals