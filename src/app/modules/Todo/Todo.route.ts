import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { TodoValidations } from './Todo.validation';
import { TodoControllers } from './Todo.controller';
const router = express.Router();

router.post(
  '/create-todo',
  validateRequest(TodoValidations.createTodoValidationSchema),
  TodoControllers.createTodo,
);

router.get('/', TodoControllers.getAllTodo);

router.put(
  '/:id',
  validateRequest(TodoValidations.updateTodoValidationSchema),
  TodoControllers.updateSingleTodoIntoDB,
);

export const TodoRoutes = router;
