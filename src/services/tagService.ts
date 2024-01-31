import * as tagRepository from '../repositories/tagRepository';
import * as errorUtils from '../utils/errorUtils';

export async function createTag(tag: string) {
    const existingTag = await tagRepository.getTagByName(tag);
    if (existingTag) throw errorUtils.conflictError('Tag already exists');

    return await tagRepository.createTag(tag);
}

export async function associateTagWithProject() {}
