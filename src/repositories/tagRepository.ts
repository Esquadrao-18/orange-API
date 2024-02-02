import { Tag, ProjectTag } from '@prisma/client';
import prisma from '../config/database';

export async function createTag(tagName: string): Promise<Tag> {
    return prisma.tag.create({
        data: { name: tagName },
    });
}

export async function getTagByName(tagName: string): Promise<Tag | null> {
    return prisma.tag.findUnique({
        where: { name: tagName },
    });
}

export async function associateTagWithProject(
    tagId: string,
    projectId: string,
): Promise<ProjectTag> {
    return prisma.projectTag.create({
        data: {
            projectId: projectId,
            tagId: tagId,
        },
    });
}

export async function deleteProjectTags(projectId: string): Promise<void> {
    await prisma.projectTag.deleteMany({
        where: { projectId: projectId },
    });
}

export async function getTagsByProjectId(projectId: string): Promise<Tag[]> {
    const projectTags = await prisma.projectTag.findMany({
        where: { projectId: projectId },
    });
    const tags = await Promise.all(
        projectTags.map(projectTag => {
            const findUniqueQuery = { where: { id: projectTag.tagId } };
            return prisma.tag.findUnique(findUniqueQuery);
        }),
    );
    return tags.filter(tag => tag !== null) as Tag[];
}

export async function getProjectTags(projectId: string): Promise<ProjectTag[]> {
    return await prisma.projectTag.findMany({
        where: { projectId: projectId },
    });
}

export async function removeTagFromProject(
    tagId: string,
    projectId: string,
): Promise<void> {
    const projectTag = await prisma.projectTag.findFirst({
        where: {
            projectId: projectId,
            tagId: tagId,
        },
    });

    if (projectTag) {
        await prisma.projectTag.delete({
            where: { id: projectTag.id },
        });
    }
}
