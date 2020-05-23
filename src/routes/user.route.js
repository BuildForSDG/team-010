import express from 'express';
import authController from '../controllers/auth.controller';
import bodyValidation from '../middlewares/validation/body.validation';

const router = express.Router();

router
  .get('/verification/:token', authController.isVerified)
  .post('/signup', [bodyValidation], authController.signup)
  .post('/signin', [bodyValidation], authController.login);


export default router;
