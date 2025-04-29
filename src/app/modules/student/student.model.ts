import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from './student.interface';
import validator from 'validator';

const userNameValidationSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is Required'],
    max: [15, "First Name can't be more than 15 character."],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is Required'],
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: '{VALUE} is not valid',
    },
  },
});

const guardianValidationSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianValidationSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentValidationSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameValidationSchema,
      required: [true, 'Name is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: '{VALUE} is not a valid email type',
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianValidationSchema,
      required: [true, 'Guardian Name is Required'],
    },
    localGuardian: {
      type: localGuardianValidationSchema,
      required: [true, 'Local Guardian Name is Required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemesterModel',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    profileImg: { type: String, default: '' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
studentValidationSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

//query middleware
studentValidationSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentValidationSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentValidationSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//creating a custom static method

// studentValidationSchema.statics.isUserExists = async function(id: string){
//   const existingUser = await TStudent.findOne({id});

//   return existingUser;
// }

//model

export const StudentModel = model<TStudent>(
  'StudentModel',
  studentValidationSchema,
);
