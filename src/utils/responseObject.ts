import type { Task } from "../types/types.js";

export const invalidTitleRes = {
  status: "failed",
  code: 400,
  error: "Bad Request",
  message: "Title must be a string",
};

export const missingTitleRes = {
  status: "failed",
  code: 400,
  error: "Bad Request",
  message: "Title is required",
};

export const successRes = (newTask: Task) => {
  return {
    status: "success",
    code: 201,
    data: newTask,
    message: "Task created successfully",
  };
};

export const serverErrorRes = {
  status: "failed",
  code: 500,
  error: "internal server error",
  message: "Server error occured while processing your request",
};
