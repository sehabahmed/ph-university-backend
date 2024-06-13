import { TAcademicDepertment } from './academicDepertment.interface';
import { AcademicDepertment } from './academicDepertment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepertment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepertment.findOne({ _id: id });
  return result;
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepertment>,
) => {
  const result = await AcademicDepertment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepertmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
