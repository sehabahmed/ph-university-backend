import mongoose, { Schema } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      min: 0,
      max: 30,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    finalTerm: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemesterModel',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'OfferedCourse',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'StudentModel',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  grade: {
    type: String,
    enum: Grade,
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const EnrolledCourse = mongoose.model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
