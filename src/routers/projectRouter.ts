import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { upload } from '../config/multerConfig';
import * as projectController from '../controllers/projectController';
import { newProjectDataSchema } from '../schemas/projectSchema';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const projectRouter = Router();

projectRouter.post(
    '/createProject',
    validateSchema(newProjectDataSchema),
    tokenMiddleware,
    upload.single('image'),
    projectController.createProject,
);

projectRouter.delete(
    '/deleteProject/:projectId',
    tokenMiddleware,
    projectController.deleteProject,
);

export default projectRouter;
