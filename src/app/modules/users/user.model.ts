import { model, Schema } from 'mongoose';
import { TUSer } from './user.interface';

const userSchema = new Schema<TUSer>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress'
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);



//Model

export const User =  model<TUSer>("UserModel", userSchema)
