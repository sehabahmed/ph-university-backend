import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //static method
  // if(await TStudent.isUserExists(studentData.id)){
  //   throw new Error("User Already Exists!")
  // }
  const result = await StudentModel.create(studentData);

  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find().populate('admissionSemester');
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await StudentModel.findOne({ id });

  const result = await StudentModel.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
