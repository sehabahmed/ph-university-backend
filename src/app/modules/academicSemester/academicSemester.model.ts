import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthsSchema,
} from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: AcademicSemesterCode,
        message: '{VALUE} is required',
      },
    },
    year: String,
    startMonth: { type: String, enum: MonthsSchema },
    endMonth: { type: String, enum: MonthsSchema },
  },
  {
    timestamps: true,
  },
);

//validation of same data existance

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('This Semester is already Exists!');
  }
  next();
});

//Model

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemeter',
  AcademicSemesterSchema,
);
