import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      //creating a schema validation using Joi
  
      const { password, student: studentData } = req.body;
  
      //data validation using Zod
  
      // const zodParsedData = userValidation.parse(studentData);
  
      //will call service function to send data
      const result = await UserServices.createStudentIntoDB(password, studentData);
  
      //send response
      res.status(200).json({
        success: true,
        message: 'Student is created Successfully',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'something went wrong',
        error: err,
      });
    }
  };

  export const userControllers = {
    createStudent
  }