import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Todo } from './Todo.model';
import { Request, Response } from 'express';
import { TodoServices } from './Todo.service';

const createTodo = catchAsync(async (req: Request, res: Response) => {
  const result = await Todo.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todo is created successfully',
    data: result,
  });
});

const getAllTodo = catchAsync(async (req: Request, res: Response) => {
  const { priority } = req.query;
  const result = await TodoServices.getAllTodoFromDB(priority as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todos are retrieve successfully',
    data: result,
  });
});

const updateSingleTodoIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TodoServices.updateSingleTodoIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todos data updated successfully',
    data: result,
  });
});

export const TodoControllers = {
  createTodo,
  getAllTodo,
  updateSingleTodoIntoDB
};
