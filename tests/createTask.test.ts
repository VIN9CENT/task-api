import { expect, it, vi } from "vitest";
import { createTask } from "../src/controller/taskController.js";
import type { Request, Response } from "express";

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
    expect.objectContaining({
      status: "failed",
      code: 400,
      message: "Title must be a string",
    }),
  );
});

it("should reject request if title is null or an empty string", ()=>{
  const req = {body: {title: " "}} as Request;
  const res = mockResponse();
  createTask(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      status: "failed",
      code: 400,
      message:"Title is required"
    })
  )
})

it("successfully creates a task if all the validations are passed", () => {
  const req = { body: { title: "Master REST API" } } as Request;
  const res = mockResponse();

  createTask(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      status: "success",
      code: 201,
      message: "Task created successfully",
      data: expect.objectContaining({
        id: expect.any(String),
        title: "Master REST API",
        completion_status: false,
        created_at: expect.any(String),
      }),
    })
  );
});