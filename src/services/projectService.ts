import * as projectRepository from '../repositories/projectRepository';
import {
    newProjectDataInterface,
    newProjectData,
    updateProjectDataInterface,
} from '../repositories/projectRepository';
import * as errorUtils from '../utils/errorUtils';
import supabase from '../config/supabaseClient';
import * as tagService from './tagService';

export async function createProject(
    projectData: newProjectDataInterface,
    imageBuffer?: Buffer,
) {
    const { title, tags, ...rest } = projectData;

    const titleUpperCase = title.toUpperCase();
    const isTitleTaken =
        await projectRepository.getProjectByTitle(titleUpperCase);
    if (isTitleTaken)
        throw errorUtils.conflictError('Project title already taken');

    const normalizedTitle = titleUpperCase
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/['"]/g, '');
    const imageName = `${normalizedTitle}-image`;

    const { data, error } = await supabase.storage
        .from('project-image')
        .upload(`${imageName}`, imageBuffer!, { upsert: true });
    if (error) throw errorUtils.internalServerError('Error uploading image');

    const imagePath = data!.path;
    const imageUrl = await supabase.storage
        .from('project-image')
        .getPublicUrl(imagePath!);
    if (!imageUrl)
        throw errorUtils.internalServerError('Error getting image URL');

    const newProjectData: newProjectData = {
        ...rest,
        imagePath,
        imageUrl: imageUrl.data.publicUrl,
        title: titleUpperCase,
    };
    const createdProject =
        await projectRepository.createProject(newProjectData);
    if (!createdProject)
        throw errorUtils.internalServerError('Error creating project');

    const associatedTags = await tagService.treatNewProjectTags(
        tags,
        createdProject.id,
    );
    if (!associatedTags)
        throw errorUtils.internalServerError('Error associating tags');

    console.log(`ACABOU DE CRIAR O PROJETO!!!!!!!!!!!!`);

    return createdProject;
}

export async function deleteProject(projectId: string) {
    const project = await projectRepository.getProjectById(projectId);
    if (!project) throw errorUtils.notFoundError('Project not found');

    const { error } = await supabase.storage
        .from('project-image')
        .remove([project.imagePath]);
    if (error) throw errorUtils.internalServerError('Error deleting image');

    // await deleteProjectTags(projectId);

    return await projectRepository.deleteProject(projectId);
}

export async function updateProject(
    projectId: string,
    newData: updateProjectDataInterface,
) {
    const project = await projectRepository.getProjectById(projectId);
    if (!project) throw errorUtils.notFoundError('Project not found');

    const { tags, ...newProjectData } = newData;
    if (tags) {
        await tagService.treatUpdatedProjectTags(newData.tags, projectId);
    }

    return await projectRepository.updateProject(projectId, newProjectData);
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

export async function getProjectsByUserId(userId: string) {
    const foundProjects = await projectRepository.getProjectsByUserId(userId);

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

export async function getProjects() {
    return projectRepository.getProjects();
}
