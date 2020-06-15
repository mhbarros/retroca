import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import session from './config/session';
import router from './routes';

const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(session);
app.use(router);

app.listen(process.env.SERVER_PORT);
