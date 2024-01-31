import { Request, Response } from "express";
import * as projectService from "../services/projectService.js";

export async function createProject(req: Request, res: Response) {
  const imageBuffer = req.file?.buffer;

  await projectService.createProject(req.body, imageBuffer);

  res.sendStatus(201);
}

export async function deleteProject(req: Request, res: Response, id: string) {
  await projectService.deleteProject(id);
  res.sendStatus(204);
}

export async function readProject(req: Request, res: Response, id: string) {
  const project = await projectService.findProjectById(id);

  res.sendStatus(201).json({ project: project });
}
