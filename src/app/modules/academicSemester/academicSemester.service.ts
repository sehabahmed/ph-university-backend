import QueryBuilder from '../../builder/QueryBuilder';
import {
  AcademicSemesterNameCodeMapper,
  academicSemesterSearchableFields,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //Name and code matching error handler
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code!');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const getAllAcademicFacultiesQuery = new QueryBuilder(
    AcademicSemesterModel.find(),
    query,
  )
    .search(academicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await getAllAcademicFacultiesQuery.countTotal();
  const result = await getAllAcademicFacultiesQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const singleAcademicSemester = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ _id: id });
  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  singleAcademicSemester,
  updateAcademicSemester,
};
