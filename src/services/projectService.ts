import * as projectRepository from '../repositories/projectRepository';
import { newProjectDataInterface } from '../repositories/projectRepository';
import * as errorUtils from '../utils/errorUtils';
import supabase from '../config/supabaseClient';

export async function createProject(
    newProjectData: newProjectDataInterface,
    imageBuffer?: Buffer,
) {
    const { title } = newProjectData;

    const titleUpperCase = title.toUpperCase();
    const isTitleTaken =
        await projectRepository.getProjectByTitle(titleUpperCase);
    if (isTitleTaken)
        throw errorUtils.conflictError('Project title already taken');

    const normalizedTitle = titleUpperCase
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
    const imageName = `${normalizedTitle}-image`;

    const { data, error } = await supabase.storage
        .from('project-image')
        .upload(imageName, imageBuffer!);
    if (error) throw errorUtils.internalServerError('Error uploading image');

    const imagePath = data?.path;
    const projectData = {
        ...newProjectData,
        imagePath,
        title: titleUpperCase,
    };
    const createdProject = await projectRepository.createProject(projectData); //POSSIBILIDADE DE ERRO, PQ O projectData TEM MAIS COISAS DO QUE O BANCO DE DADOS ACEITA
    if (!createdProject)
        throw errorUtils.internalServerError('Error creating project');
}

export async function deleteProject(projectId: string) {
    const project = await projectRepository.getProjectById(projectId);

    if (!project) throw errorUtils.notFoundError('Project not found');

    return await projectRepository.deleteProject(projectId);
}

export async function updateProject(
    projectId: string,
    newData: projectRepository.newProjectDataInterface,
) {
    const project = await projectRepository.getProjectById(projectId);

    if (!project) throw errorUtils.notFoundError('Project not found');

    return await projectRepository.updateProject(projectId, newData);
}

export async function findProjectById(projectId: string) {
    const project = await projectRepository.getProjectById(projectId);

    if (!project) throw errorUtils.notFoundError('Project not found');

    return project;
}

export async function getProjectsByUserId(userId: string) {
    return await projectRepository.getProjectsByUserId(userId);
}
