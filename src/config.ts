export default {
    port: parseInt(process.env.PORT),
    apiPrefix: '/api/v1',
    jwt: {
        secret: process.env.JWT_SECRET
    },
    postgress: {
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASS, //will be ENV variable when deployed
        database: process.env.PG_DB, //collectionManager
    }
};