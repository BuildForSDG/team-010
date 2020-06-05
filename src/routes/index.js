import { Router } from 'express';
import userRoute from './user.route';


const router = new Router();

router.use('/auth', userRoute);


export default router;
