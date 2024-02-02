import * as projectRepository from '../repositories/projectRepository';
import {
    newProjectDataInterface,
    newProjectData,
} from '../repositories/projectRepository';
import * as errorUtils from '../utils/errorUtils';
import supabase from '../config/supabaseClient';
import * as tagService from './tagService';

export async function createProject(
    ProjectData: newProjectDataInterface,
    imageBuffer?: Buffer,
) {
    const { title, tags } = ProjectData;

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
    const projectData: newProjectData = {
        ...ProjectData,
        imagePath,
        title: titleUpperCase,
    };
    const createdProject = await projectRepository.createProject(projectData); //POSSIBILIDADE DE ERRO, PQ O projectData TEM MAIS COISAS DO QUE O BANCO DE DADOS ACEITA
    if (!createdProject)
        throw errorUtils.internalServerError('Error creating project');

    const associatedTags = await tagService.treatNewProjectTags(
        tags,
        createdProject.id,
    );

    if (!associatedTags)
        throw errorUtils.internalServerError('Error associating tags');

    return createdProject;
}

export async function deleteProject(projectId: string) {
    const project = await projectRepository.getProjectById(projectId);

    if (!project) throw errorUtils.notFoundError('Project not found');

    return await projectRepository.deleteProject(projectId);
}

export async function updateProject(
    projectId: string,
    newData: newProjectDataInterface,
) {
    const project = await projectRepository.getProjectById(projectId);

    if (!project) throw errorUtils.notFoundError('Project not found');

    return await projectRepository.updateProject(projectId, newData);
}

export async function getProjectById(projectId: string) {
    const foundProject = await projectRepository.getProjectById(projectId);

    if (!foundProject) throw errorUtils.notFoundError('Project not found');

    const { ProjectTag, ...projectData } = foundProject;
    const project = {
        ...projectData,
        tags: ProjectTag.map(projectTag => projectTag.Tag),
    };

    return project;
}

export async function getProjectsByUserId(
    userId: string,
    limit = 10,
    offset = 0,
) {
    const foundProjects = await projectRepository.getProjectsByUserId(
        userId,
        limit,
        offset,
    );

    if (!foundProjects) throw errorUtils.notFoundError('Projects not found');

    const projects = [];
    for (const project of foundProjects) {
        const { ProjectTag, ...projectData } = project;
        const projectWithTags = {
            ...projectData,
            tags: ProjectTag.map(projectTag => projectTag.Tag),
        };
        projects.push(projectWithTags);
    }

    return projects;
}

// export async function getProjectsByUserIdAndTags(
//     userId: string,
//     tags: string[],
//     limit = 10,
//     offset = 0,
// ) {
//     return projectRepository.getProjectsByUserIdAndTags(
//         userId,
//         tags,
//         limit,
//         offset,
//     );
// }

export async function getProjects(limit = 10, offset = 0) {
    return projectRepository.getProjects(limit, offset);
}
