import { model, Schema } from 'mongoose';
import { TUSer } from './user.interface';
import config from '../../index';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUSer>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  //hashing password and save into DB

  //eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//set empty string after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//Model

export const User = model<TUSer>('User', userSchema);
