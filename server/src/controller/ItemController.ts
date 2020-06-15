import {Request, Response} from 'express';
import db from "../db/db";

class ItemController {
  async index(req: Request, res: Response){
    let {it_i: item_id} = req.query;

    let table_category_item = db.ref('category_item').as('ci');
    let table_item_cateogry = db.ref('item_category').as('ic');

    let query = db.select([
      db.ref('item.id').as('item_id'),
      db.ref('item.description').as('item_description'),
      db.raw("CASE WHEN item.condition = '0' THEN 'New' WHEN item.condition = '1' THEN 'Used' END AS item_condition"),
      db.ref('ci.description').as('item_category'),
      db.ref('user.id').as('user_id'),
      db.ref('user.name').as('user_name'),
      db.ref('user.phone').as('user_phone'),
      'user.latitude',
      'user.longitude',
      'user.city',
      'user.uf',
    ])
      .from(table_item_cateogry)
      .innerJoin('item', 'ic.id_item', '=', 'item.id')
      .innerJoin(table_category_item, 'ci.id', '=', 'ic.id_category_item')
      .innerJoin('user', 'item.id_user', '=', 'user.id')
      .limit(20)
      .orderBy(['user.latitude', 'user.longitude']);

    if(item_id){
      query.where('item.id', Number(item_id));
    }

    let data = await query;
    res.json({ok: true, data});

  }

  async create(req: Request, res: Response){
    if(!req.session || !req.session.user || !req.session.user.id){
      return res.redirect(401,'/');
    }

    let {description, condition, category} = req.body;

    if(!description || !condition || !category){
      return res.json({ok: false, reason: "Required field missing"});
    }

    if([0, 1].indexOf(Number(condition)) === -1){
      return res.json({ok: false, reason: "Item condition not found"});
    }

    let newItem = {
      description,
      condition,
      id_user: req.session.user.id
    };

    let trx = await db.transaction();

    try{
      let item = await trx.insert(newItem).into('item');
      if(!item){
        await trx.rollback();
        return res.json({ok: false, reason: 'Error on creating new item. Please, try again.'});
      }

      let item_category = await trx.insert({id_item: item, id_category_item: category}).into('item_category');
      if(!item_category){
        await trx.rollback();
        return res.json({ok: false, reason: 'Error on creating item. Please, try again'});
      }

      await trx.commit();
      res.json({ok: true});

    }catch (e) {
      console.log(e.code);
      res.json({ok: false, reason: 'Error on creating item. Please, try again.'});
    }
  }
}

export default ItemController;
