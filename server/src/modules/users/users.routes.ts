import express, { Request, Response } from 'express'
import UsersController from './users.controller';
import AuthController from '../auth/auth.controller';

const router = express.Router();

router
  .route('/')
  .get(UsersController.gets);

router
.route('/:username')
.get(AuthController.guardAuthToken, UsersController.profile);

export default router