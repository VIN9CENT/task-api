import { Router,} from "express";
import { createTask } from "../controller/taskController.js";

const taskRouter = Router()
taskRouter.post("/tasks",createTask)
export default taskRouter;