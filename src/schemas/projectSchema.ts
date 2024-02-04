import joi from 'joi';
import { newProjectDataSchemaInterface } from '../repositories/projectRepository.js';

export const newProjectDataSchema = joi.object<newProjectDataSchemaInterface>({
    title: joi.string().required(),
    link: joi.string().uri().required(),
    tags: joi.array().items(joi.string()),
    description: joi.string().required(),
    releaseDate: joi.date().required(),
    userId: joi.string().required(),
});

export const updateProjectDataSchema =
    joi.object<newProjectDataSchemaInterface>({
        title: joi.string(),
        link: joi.string().uri(),
        image: joi.any().meta({ swaggerType: 'file' }),
        tags: joi.array().items(joi.string()),
        description: joi.string(),
        releaseDate: joi.date(),
        userId: joi.string(),
    });

export const projectTagsSchema = joi.object({
    tags: joi.array().items(joi.string()),
});
