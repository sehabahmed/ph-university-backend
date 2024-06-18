import { Schema, model } from 'mongoose';
import { TAcademicDepertment } from './academicDepertment.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const AcademicDepertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

AcademicDepertmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepertment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Department Already Exist!');
  }
  next();
});

AcademicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepertment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Department Does not Exist!');
  }

  next();
});

// Model

export const AcademicDepertment = model<TAcademicDepertment>(
  'AcademicDepertment',
  AcademicDepertmentSchema,
);
