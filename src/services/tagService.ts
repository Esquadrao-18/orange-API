import * as tagRepository from '../repositories/tagRepository';
import * as errorUtils from '../utils/errorUtils';
import { Tag } from '@prisma/client';

export async function createTag(tag: string) {
    const existingTag = await tagRepository.getTagByName(tag);
    if (existingTag) throw errorUtils.conflictError('Tag already exists');

    return await tagRepository.createTag(tag);
}

export async function treatNewProjectTags(tags: string[], projectId: string) {
    const treatedTags: Tag[] = [];

    for (const tag of tags) {
        const normalizedTag = tag
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const existingTag = await tagRepository.getTagByName(normalizedTag);

        if (!existingTag) {
            const newTag = await createTag(normalizedTag);
            treatedTags.push(newTag);
        } else {
            treatedTags.push(existingTag);
        }
    }

    for (const tag of treatedTags) {
        const projectTag = await tagRepository.associateTagWithProject(
            tag.id,
            projectId,
        );

        if (!projectTag)
            throw errorUtils.internalServerError('Error associating tags');
    }

    return true;
}
