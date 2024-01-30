import { Project } from '@prisma/client'
import prisma from '../config/database.js';


export async function createProject(projectData: newProjectData) {
    return prisma.project.create({
        data: projectData,
    });
}

export async function deleteProject(projectId: string){
    return prisma.project.delete({
        where: {
            id: projectId
        }
    });
}

export async function updateProject(projectId: string, newData: newProjectDataInterface){
    return prisma.project.update({
        where: {
            id: projectId,
        },
        data: newData
    });
}

export async function getProjectById(projectId: string){
    return prisma.project.findUnique({
        where: {
            id: projectId
        }
    });
}

export async function getProjectsByUserId(userId: string){
    return prisma.project.findMany({
        where: {
            userId: userId
        }
    });
}

export async function getProjectByTitle(title: string){
    return prisma.project.findUnique({
        where: {
            title: title
        }
    });
}


export interface newProjectDataInterface extends Omit<Project, 'id' | 'imagePath'> {
    image: Express.Multer.File,
    tags: string[]
}
export interface newProjectData extends Omit<Project, 'id'> {}