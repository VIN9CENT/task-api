import type { Request, Response } from "express";
import type { Task } from "../types/types.js";
import {
  invalidTitleRes,
  missingTitleRes,
  serverErrorRes,
  successRes,
} from "../utils/responseObject.js";

export let tasks: Task[] = [];

export const createTask = (req: Request, res: Response) => {
  try {
    const { title, description, completion_status } = req.body;

    if (typeof title !== "string") {
      res.status(400).json(invalidTitleRes);
      return;
    }
    if (!title || title.trim().length === 0) {
      res.status(400).json(missingTitleRes);
      return;
    }

    const uuid = crypto.randomUUID();
    const newTask: Task = {
      id: uuid,
      title,
      description,
      completion_status: completion_status ?? false,
      created_at: new Date().toLocaleDateString(),
    };
    tasks.push(newTask);
    res.status(201).json(successRes(newTask));
  } catch (Error) {
    res.status(500).json(serverErrorRes);
  }
};

export const getTasks = (req: Request, res: Response) => {
  if (!tasks) {
    res.status(500).json({
      status: "failed",
      code: 500,
      error: "Internal server error",
      message: "Server error occured while processing your request",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: tasks,
    message: "tasks retrieved successfully",
  });
};
