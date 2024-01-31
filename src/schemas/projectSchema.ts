import joi from 'joi';
import { newProjectDataInterface } from '../repositories/projectRepository.js';

export const newProjectDataSchema = joi.object<newProjectDataInterface>({
    title: joi.string().required(),
    link: joi.string().uri().required(),
    image: joi.any().meta({ swaggerType: 'file' }).required(),
    tags: joi.array().items(joi.string()),
    description: joi.string().required(),
    releaseDate: joi.date().required(),
    userId: joi.string().required(),
});
