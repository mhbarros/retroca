import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import db from "../db/db";

class UserController{
  async create(req: Request, res: Response){
    let {name, email, phone, password, city, uf, latitude, longitude} = req.body;

    if(!name || !email || !phone || !password || !city || !uf || !latitude || !longitude){
      return res.json({ok: false, reason: 'Required field missing'});
    }

    password = await bcrypt.hash(password, 10);

    if(!password){
      return res.json({ok: false, reason: 'Invalid password'});
    }

    try{
      let newUser = await db('user').insert({name, email, phone, password, city, uf, latitude, longitude});
      if(newUser){
        if(req.session){
          req.session.user = {
            id: newUser[0],
            name,
            email
          }

          return res.json({ok: true});
        }
      }
      res.json({ok: false, reason: 'Error on creating user. Please, try again.'});
    }catch (e) {
      switch (e.code) {
        case "ER_DUP_ENTRY":
          return res.json({ok: false, reason: 'E-mail already exists.'});

        default:
          return res.json({ok: false, reason: 'Error on creating user. Please, try again.'});

      }
    }
  }
}

export default UserController;
