import joi from 'joi';
import { newProjectData } from '../repositories/projectRepository.js';

export const newProjectDataSchema = joi.object<newProjectData>({
    title: joi.string().required(),
    link: joi.string().uri().required(),
    description: joi.string().required(),
    imagePath: joi.string().required(),
    releaseDate: joi.date().required(),
    userId: joi.string().required()
});