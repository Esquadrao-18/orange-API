import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { upload } from '../config/multerConfig';
import * as projectController from '../controllers/projectController';
import {
    newProjectDataSchema,
    updateProjectDataSchema,
    projectTagsSchema,
} from '../schemas/projectSchema';
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

projectRouter.put(
    '/updateProject/:projectId',
    validateSchema(updateProjectDataSchema),
    tokenMiddleware,
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

projectRouter.get(
    '/projects/:userId/tags',
    validateSchema(projectTagsSchema),
    tokenMiddleware,
    projectController.getProjectsByUserIdAndTags,
);

projectRouter.get('/projects', tokenMiddleware, projectController.getProjects);

export default projectRouter;
