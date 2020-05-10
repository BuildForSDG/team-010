import express from 'express';
import authController from '../controllers/auth.controller';
import bodyValidation from '../middlewares/validation/body.validation';

const router = express.Router();

router.post('/auth/signup', [bodyValidation], authController.signup);
// router.post('/auth/signin', [bodyValidation], authController.signin);


export default router;
