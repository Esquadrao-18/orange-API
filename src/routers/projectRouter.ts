import { Router } from 'express';
// import validateSchema from '../middlewares/validateSchemaMiddleWare';
import * as projectController from '../controllers/projectController';
import { newProjectDataSchema } from '../schemas/projectSchema';

const projectRouter = Router()

projectRouter.get(
    '/project/:id',
    // validateSchema(newProjectDataSchema),
    (req,res) => projectController.readProject(req,res,req.params.id),
);


export default projectRouter;