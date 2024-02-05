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
