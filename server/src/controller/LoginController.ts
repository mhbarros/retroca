import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import db from "../db/db";

class LoginController {
  async userLogin(req: Request, res: Response){

    let {email, password} = req.body;

    if(!email || !password){
      return res.json({ok: false, reason: 'Required field is missing'});
    }

    let user:any = await db.select().from('user').where({email}).first();

    let valid = await bcrypt.compare(password, user.password);
    if(!valid){
      return res.json({ok: false, reason: 'Invalid e-mail or password'});
    }

    if(user && req.session){
      req.session.user = {
        id: user.id,

      }

      user.password = undefined;

      return res.json({ok: true, data: user});
    }
    res.json({ok: false, reason: 'User not found'});
  }
}

export default LoginController;
