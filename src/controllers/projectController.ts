import { Request, Response } from 'express';
import * as projectService from '../services/projectService.js';
import { projects } from '../repositories/projectRepository';

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

export async function updateProject(req: Request, res: Response) {
    const { projectId } = req.params;
    await projectService.updateProject(projectId, req.body);
    res.sendStatus(204);
}

export async function getProjectById(req: Request, res: Response) {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);

    res.sendStatus(200).json(project);
}

export async function getProjectsByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const { limit, offset } = req.query;
    const projects = await projectService.getProjectsByUserId(
        userId,
        Number(limit),
        Number(offset),
    );

    res.sendStatus(201).json(projects);
}

// export async function getProjectsByUserIdAndTags(req: Request, res: Response) {
//     const { userId } = req.params;
//     const { tags } = req.body;
//     const { limit, offset } = req.query;
//     const projects = await projectService.getProjectsByUserIdAndTags(
//         userId,
//         tags,
//         Number(limit),
//         Number(offset),
//     );
//
//     res.sendStatus(201).json(projects);
// }

export async function getProjects(req: Request, res: Response) {
    const { limit, offset } = req.query;
    const projects = await projectService.getProjects(
        Number(limit),
        Number(offset),
    );

    res.sendStatus(201).json(projects);
}
