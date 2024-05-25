import { Request, Response } from 'express';
import { StudentService } from './student.service';


//get all students

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDb();

    res.status(200).json({
      success: true,
      message: 'Students are retrieve Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

//get single student by id

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: 'Single Student data loaded successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

//delete student

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteSingleStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: 'Student data deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {

  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
