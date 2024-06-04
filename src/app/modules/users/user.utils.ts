import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

// id will generate by following: year, semesterCode, 4 digit number
export const generateStudentId = (payload: TAcademicSemester) => {

    const currentId = (0).toString().padStart(4, '0');
    let incrementId = (Number(currentId) + 1).toString();

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;
};
