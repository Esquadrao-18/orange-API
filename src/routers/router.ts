import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
import projectRouter from './projectRouter';

const router = Router();
router.use(userRouter);
router.use(projectRouter);

// Health check route
router.head('/statusMonitor', (req: Request, res: Response) => {
    res.sendStatus(204);
});

export default router;
