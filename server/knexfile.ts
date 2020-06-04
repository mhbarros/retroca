import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

module.exports =  {
  client: 'mysql',
  connection: {
    host: process.env.DB_MYSQL_HOST,
    port: Number(process.env.DB_MYSQL_PORT),
    database: process.env.DB_MYSQL_NAME,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASS
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'db', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'db', 'seeds')
  }
}
