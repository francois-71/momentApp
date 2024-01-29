// src/routes/loginRoutes.ts
import express from 'express';
import loginController from '../controllers/loginController';
import registerController from '../controllers/registerController';
import userController from '../controllers/userController';

const router = express.Router();

router.use('/api', loginController);

router.use('/api', registerController);

router.use('/api', userController)

export default router;
