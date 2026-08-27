import { Router } from "express";
import { createTask, getTasks } from "../controller/taskController.js";
import { get } from "node:http";

const taskRouter = Router();
taskRouter.post("/tasks", createTask);
taskRouter.get("/tasks", getTasks);
export default taskRouter;
