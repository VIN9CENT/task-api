import { expect, describe, it } from "vitest";
import { createTask } from "../src/controller/taskController.js";
//import type{Task} from "./src/types/types.ts"



it("should reject request if the typeof title is not a string", () => {
    
  const task = {
    title: "Master REST API",
  };

  const req:Record<string, any> = {
    params:null,
    query:null,
    body: task,
    headers: null,
    record: {"key":"value"}
  };

const res:Response = {}
createTask(req, res)
const resObject = {
        status: "failed",
        code: 400,
        error: "Bad Request",
        message: "Title must be a string",
      }
expect(res.json).toBe(resObject)
});

// import { expect, test } from 'vitest'
// import { sum } from './sum.js'

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3)
// })
