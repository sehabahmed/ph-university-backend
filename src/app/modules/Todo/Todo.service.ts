import { TTodo } from './Todo.interface';
import { Todo } from './Todo.model';

const createTodoIntoDB = async (payload: TTodo) => {
  const result = await Todo.create(payload);

  return result;
};

const getAllTodoFromDB = async (priority?: string) => {
  const query = priority ? { priority } : {}
  const result = await Todo.find(query);
  return result;
};

const updateSingleTodoIntoDB = async (id: string, payload: TTodo) => {
  const result = await Todo.findByIdAndUpdate({ _id: id }, payload, {
    unique: true,
    runValidators: true,
    upsert: true
  });

  return result;
};

export const TodoServices = {
  createTodoIntoDB,
  getAllTodoFromDB,
  updateSingleTodoIntoDB,
};
