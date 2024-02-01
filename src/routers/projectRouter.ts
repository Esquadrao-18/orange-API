import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { upload } from '../config/multerConfig';
import * as projectController from '../controllers/projectController';
import { newProjectDataSchema } from '../schemas/projectSchema';

const projectRouter = Router();

projectRouter.post(
    '/createProject',
    validateSchema(newProjectDataSchema),
    upload.single('image'),
    projectController.createProject,
);

projectRouter.delete(
    '/deleteProject/:projectId',
    projectController.deleteProject,
);

export default projectRouter;
