import knex from 'knex';

const conn = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_MYSQL_HOST,
        port: Number(process.env.DB_MYSQL_PORT),
        database: process.env.DB_MYSQL_NAME,
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASS
    }
});

export default conn;
