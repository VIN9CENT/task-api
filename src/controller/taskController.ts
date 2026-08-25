import type { Request, Response } from "express";
import type { Task } from "../types/types.js";

const tasks: Task[] = [];
export const createTask = (req: Request, res: Response) => {
  try {
    const { title, description, completion_status } = req.body;

    if (typeof title !== "string") {
      res.status(400).json({
        status: "failed",
        code: 400,
        error: "Bad Request",
        message: "Title must be a string",
      });
      return;
    }
    if (!title || title.trim().length === 0) {
      res.status(400).json({
        status: "failed",
        code: 400,
        error: "Bad Request",
        message: "Title is required",
      });
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
    res.status(201).json({
      status: "success",
      code: 201,
      data: newTask,
      message: "Task created successfully ",
    });
  } catch (Error) {
    res.status(500).json({
      status: "failed",
      code: 500,
      error: "Internal server error",
      message: "Server error occured while processing your request",
    });
  }
};

//createTask()
