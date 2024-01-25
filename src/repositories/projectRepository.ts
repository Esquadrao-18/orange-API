import { Project } from '@prisma/client'
import prisma from '../config/database.js';


export async function createProject(projectData: newProjectData) {
    return await prisma.project.create({
      data: projectData,
    });
}

export async function deleteProject(projectId: string){
    return await prisma.project.delete({
        where: {
            id: projectId
        }
    });
}

export async function updateProject(projectId: string, newData: newProjectData){
    return await prisma.project.update({
        where:{
            id: projectId,
        },
        data: newData
    })
}

export async function readProject(projectId: string){
    return await prisma.project.findUnique({
        where:{
            id: projectId
        }
    })
}

  
export type newProjectData = Omit<Project, 'id'>;