import { Router } from 'express';
import userRouter from './userRouter';
import projectRouter from './projectRouter';

const router = Router();
router.use(userRouter);
router.use(projectRouter);

export default router;
