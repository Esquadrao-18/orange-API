import { Request, Response } from 'express';
import * as projectService from '../services/projectService.js';

export async function createProject(req: Request, res: Response) {
    const imageBuffer = req.file?.buffer;

    await projectService.createProject(req.body, imageBuffer);

    res.sendStatus(201);
}

export async function deleteProject(req: Request, res: Response) {
    const { projectId } = req.params;
    await projectService.deleteProject(projectId);
    res.sendStatus(204);
}

export async function getProjectById(req: Request, res: Response) {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);

    res.sendStatus(201).json(project);
}

export async function getProjectsByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const projects = await projectService.getProjectsByUserId(userId);

    res.sendStatus(201).json(projects);
}
