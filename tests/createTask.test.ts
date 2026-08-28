import { expect, it, vi } from "vitest";
import {
  createTask,
  getTasks,
  tasks,
} from "../src/controller/taskController.js";
import type { Request, Response } from "express";
import {
  invalidTitleRes,
  missingTitleRes,
  successRes,
} from "../src/utils/responseObject.js";
import type { Task } from "../src/types/types.js";
function mockResponse() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

it("should reject request if the typeof title is not a string", () => {
  const req = { body: { title: 467 } } as Request;
  const res = mockResponse();

  createTask(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining(invalidTitleRes),
  );
});

it("should reject request if title is null or an empty string", () => {
  const req = { body: { title: " " } } as Request;
  const res = mockResponse();
  createTask(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining(missingTitleRes),
  );
});

it("successfully creates a task if all the validations are passed", () => {
  const req = { body: { title: "Master REST API" } } as Request;
  const res = mockResponse();
  const expectedTask: Task = {
    id: expect.any(String),
    title: "Master REST API",
    completion_status: false,
    created_at: expect.any(String),
  };

  createTask(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining(successRes(expectedTask)),
  );
});

it("should return an empty array when no task exists", () => {
  tasks.length = 0;
  const req = {} as Request;
  const res = mockResponse();

  getTasks(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      status: "success",
      code: 200,
      data: [],
      message: "tasks retrieved successfully",
    }),
  );
});

it("should have array tasks containing task object", () => {
  tasks.push({
    id: "123",
    title: "live coding",
    completion_status: false,
    created_at: new Date().toLocaleDateString(),
  });
  const req = {} as Request;
  const res = mockResponse();

  getTasks(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      status: "success",
      code: 200,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: "123",
          title: "live coding",
          completion_status: false,
        }),
      ]),
      message: "tasks retrieved successfully",
    }),
  );
});
