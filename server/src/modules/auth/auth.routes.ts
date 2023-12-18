import express, { Request, Response } from 'express'
import AuthController from './auth.controller';

const router = express.Router();

router
  .route('/register')
  .post(AuthController.register);

router
.route('/login')
.post(AuthController.login);

export default router