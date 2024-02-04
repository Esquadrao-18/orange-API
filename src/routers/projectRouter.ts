import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { upload } from '../config/multerConfig';
import * as projectController from '../controllers/projectController';
import { updateProjectDataSchema } from '../schemas/projectSchema';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const projectRouter = Router();

projectRouter.post(
    '/createProject',
    tokenMiddleware,
    upload.single('image'),
    // validateSchema(newProjectDataSchema),
    projectController.createProject,
);

projectRouter.delete(
    '/deleteProject/:projectId',
    tokenMiddleware,
    projectController.deleteProject,
);

projectRouter.put(
    '/updateProject/:projectId',
    tokenMiddleware,
    validateSchema(updateProjectDataSchema),
    projectController.updateProject,
);

projectRouter.get(
    '/project/:projectId',
    tokenMiddleware,
    projectController.getProjectById,
);

projectRouter.get(
    '/projects/:userId',
    tokenMiddleware,
    projectController.getProjectsByUserId,
);

projectRouter.get('/projects', tokenMiddleware, projectController.getProjects);

export default projectRouter;
