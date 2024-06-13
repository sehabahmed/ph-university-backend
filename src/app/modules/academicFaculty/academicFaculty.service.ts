import { TacademicFaculty } from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TacademicFaculty) => {
  const result = academicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await academicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFaculty.findOne({ _id: id });
  return result;
};

const updateAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<TacademicFaculty>,
) => {
  const result = await academicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};