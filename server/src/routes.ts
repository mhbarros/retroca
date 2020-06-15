import express from 'express';
import path from 'path';

const router = express.Router();

import UserController         from "./controller/UserController";
import ItemController         from "./controller/ItemController";
import CategoryItemController from "./controller/CategoryItem";
import LoginController        from "./controller/LoginController";

const userController         = new UserController();
const itemController         = new ItemController();
const categoryItemController = new CategoryItemController();
const loginController        = new LoginController();

router.use('/img', express.static(path.resolve(__dirname, '..', 'assets', 'img')));

router.get("/item", itemController.index);
router.post('/item', itemController.create);

router.get('/item/category', categoryItemController.index);

router.post('/login/user', loginController.userLogin);

router.post('/user', userController.create);


export default router;
