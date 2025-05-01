import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { StudentModel } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { calculateAndPoints } from './enrolledCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createEnrolledCourse = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const student = await StudentModel.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled!');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Courses seat is full');
  }

  //check total credits exceeds maxCredits

  const course = await Course.findById(isOfferedCourseExists.course);
  const currentCredits = course?.credits;

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');
  const maxCredit = semesterRegistration?.maxCredit;

  const enrolledCourse = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  //   total enrolledCredits + new enrolledCredits > maxCredits

  const totalCredits =
    enrolledCourse.length > 0 ? enrolledCourse[0].totalEnrolledCredits : 0;

  if (totalCredits && maxCredit && totalCredits + currentCredits > maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicDepartment,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Enroll course');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to Create Enroll Course',
    );
  }
};

const getFacultyEnrolledCoursesFromDb = async(facultyId: string,
  query: Record<string, unknown>
) => {
  const faculty = await Faculty.findOne({ id: facultyId });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: faculty._id }).populate(
      'semesterRegistration academicFaculty academicSemester offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await enrolledCourseQuery.countTotal();
  const result = await enrolledCourseQuery.modelQuery;

  return {
    meta,
    result,
  };
}

const getMyEnrolledCousesFromDb = async (
  studentId: string,
  query: Record<string, unknown>,
) => {
  const student = await StudentModel.findOne({ id: studentId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student Not Found');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }).populate(
      'semesterRegistration academicFaculty academicSemester offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await enrolledCourseQuery.countTotal();
  const result = await enrolledCourseQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExist =
    SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not Found');
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const isStudentExists = await StudentModel.findById(student);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const isCourseBelongsToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongsToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are Forbidden');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2, finalTerm } =
      isCourseBelongsToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(midTerm) +
      Math.ceil(classTest2) +
      Math.ceil(finalTerm);

    const result = calculateAndPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongsToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourse,
  getFacultyEnrolledCoursesFromDb,
  getMyEnrolledCousesFromDb,
  updateEnrolledCourseMarksIntoDB,
};
