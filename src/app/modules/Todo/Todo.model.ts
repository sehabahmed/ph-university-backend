import { Schema, model } from 'mongoose';
import { TTodo } from './Todo.interface';

const TodoSchema = new Schema<TTodo>({
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    defaultValue: false,
  },
  priority: {
    type: String,
    required: true,
  }
});

export const Todo = model<TTodo>('Todo', TodoSchema); 
