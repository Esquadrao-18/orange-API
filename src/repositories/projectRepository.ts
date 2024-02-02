import { Project, ProjectTag, Tag } from '@prisma/client';
import prisma from '../config/database.js';

export async function createProject(projectData: newProjectData) {
    return prisma.project.create({
        data: projectData,
    });
}

export async function deleteProject(projectId: string) {
    return prisma.project.delete({
        where: {
            id: projectId,
        },
    });
}

export async function updateProject(
    projectId: string,
    newData: newProjectData,
) {
    return prisma.project.update({
        where: {
            id: projectId,
        },
        data: newData,
    });
}

export async function getProjectById(projectId: string) {
    return prisma.project.findUnique({
        where: { id: projectId },
        select: {
            id: true,
            title: true,
            description: true,
            imagePath: true,
            userId: true,
            link: true,
            releaseDate: true,
            ProjectTag: {
                select: {
                    Tag: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
}

export async function getProjectsByUserId(
    userId: string,
    limit: number,
    offset: number,
) {
    return prisma.project.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            imagePath: true,
            userId: true,
            link: true,
            releaseDate: true,
            ProjectTag: {
                select: {
                    Tag: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        take: limit,
        skip: offset,
    });
}

export async function getProjectByTitle(title: string) {
    return prisma.project.findUnique({
        where: {
            title: title,
        },
    });
}

export async function getProjects(limit: number, offset: number) {
    return prisma.project.findMany({
        take: limit,
        skip: offset,
    });
}

export interface newProjectDataSchemaInterface
    extends Omit<Project, 'id' | 'imagePath'> {
    image: File;
    tags: string[];
}

export interface newProjectDataInterface
    extends Omit<Project, 'id' | 'imagePath'> {
    tags: string[];
}

export interface newProjectData extends Omit<Project, 'id'> {}

export interface updateProjectData extends Omit<Project, 'id'> {}

export interface updateProjectDataInterface extends Omit<Project, 'id'> {
    tags: string[];
}

export type projects = Project[];
