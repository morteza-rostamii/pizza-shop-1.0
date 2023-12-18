import { NextFunction, Request, Response } from 'express';
import prisma from '../../config/prisma';

class UsersController {

  static async gets(req:Request, res:Response, next:NextFunction) {
    return res.status(200).json({
      msg: 'get all users',
    })
  }

  static async profile(req:Request, res:Response, next:NextFunction) {
    try {
      return res.status(200).json({
        msg: 'user profile!!',
      });
    } catch(error: any) {
      return res.status(500).json({ 
        error: 'Failed get user profile',
        message: error.message,
      }); 
    }
  }
}

export default UsersController