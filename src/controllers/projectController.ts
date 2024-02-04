import { Request, Response } from 'express';
import * as projectService from '../services/projectService.js';

export async function createProject(req: Request, res: Response) {
    const imageBuffer = req.file?.buffer;
    await projectService.createProject(req.body, imageBuffer);

    return res.sendStatus(201);
}

export async function deleteProject(req: Request, res: Response) {
    const { projectId } = req.params;
    await projectService.deleteProject(projectId);

    return res.sendStatus(204);
}

export async function updateProject(req: Request, res: Response) {
    const { projectId } = req.params;
    await projectService.updateProject(projectId, req.body);

    return res.sendStatus(204);
}

export async function getProjectById(req: Request, res: Response) {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);

    return res.sendStatus(200).json(project);
}

export async function getProjectsByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const projects = await projectService.getProjectsByUserId(userId);

    return res.sendStatus(201).json(projects);
}

export async function getProjects(req: Request, res: Response) {
    const projects = await projectService.getProjects();

    return res.sendStatus(201).json(projects);
}
