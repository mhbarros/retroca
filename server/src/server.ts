import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333);
