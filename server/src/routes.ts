import express from 'express';
import path from 'path';

const routes = express.Router();

routes.use('/img', express.static(path.resolve(__dirname, '..', 'assets', 'img')));

export default routes;
