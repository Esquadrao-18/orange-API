import * as projectRepository from "../repositories/projectRepository";

export async function createProject(newProjectData: projectRepository.newProjectData) {
    return await projectRepository.createProject(newProjectData);    
}

export async function deleteProject(projectId: string){
    return await projectRepository.deleteProject(projectId);
}

export async function readProject(projectId: string){
    return await projectRepository.readProject(projectId);
}

export async function updateProject(projectId: string, newData: projectRepository.newProjectData){
    return await projectRepository.updateProject(projectId,newData);
}