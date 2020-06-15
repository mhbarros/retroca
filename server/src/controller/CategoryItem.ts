import {Request, Response} from "express";
import db from "../db/db";

class CategoryItemController {
  async index(req: Request, res: Response){
    let items = await db('category_item').select('*');

    items = items.map(item => {
      item.img = `http://localhost:4000/img/${item.icon}`;
      return item;
    })
    res.send(items);
  }
}

export default CategoryItemController;
