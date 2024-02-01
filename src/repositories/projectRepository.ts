import { Project } from '@prisma/client';
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
    newData: newProjectDataSchemaInterface,
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
        where: {
            id: projectId,
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
