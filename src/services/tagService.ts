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
            throw errorUtils.internalServerError(
                `Error associating tag ${tag.name}`,
            );
    }

    return true;
}

export async function treatUpdatedProjectTags(
    tags: string[],
    projectId: string,
) {
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
    const currentProjectTags = await tagRepository.getProjectTags(projectId);
    console.log('CURRENT PROJECT TAGS ==========>');
    console.log(currentProjectTags);

    const tagsToRemove = currentProjectTags.filter(
        currentTag => !treatedTags.some(tag => tag.id === currentTag.id),
    );
    console.log('TAGS TO REMOVE ==========>');
    console.log(tagsToRemove);

    for (const tag of tagsToRemove) {
        await tagRepository.removeTagFromProject(tag.id, projectId);
    }

    for (const tag of treatedTags) {
        if (
            !currentProjectTags.some(currentTag => currentTag.tagId === tag.id)
        ) {
            const projectTag = await tagRepository.associateTagWithProject(
                tag.id,
                projectId,
            );

            if (!projectTag)
                throw errorUtils.internalServerError(
                    `Error associating tag ${tag.name}`,
                );
        }
    }

    return true;
}
