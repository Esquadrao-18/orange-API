import joi from 'joi';
import { updateProjectDataSchemaInterface } from '../repositories/projectRepository.js';

export const updateProjectDataSchema =
    joi.object<updateProjectDataSchemaInterface>({
        title: joi.string().optional(),
        link: joi.string().uri().optional(),
        tags: joi.array().items(joi.string()).optional(),
        description: joi.string().optional(),
        releaseDate: joi.date().optional(),
        userId: joi.string().optional(),
    });
