import Joi from "joi";

// Define the UserName schema
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(15)
      .required()
      .pattern(/^[A-Za-z]+$/, 'alphabet')
      .message('First Name is not valid'),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .trim()
      .required()
      .pattern(/^[A-Za-z]+$/, 'alphabet')
      .message('Last Name is not valid'),
  });

  // Define the Guardian schema
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });

  // Define the LocalGuardian schema
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });

  // Define the Student schema
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages({ 'any.only': '{#label} is not valid' }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().optional(),
    isActive: Joi.string().valid('active', 'block').default('active'),    
  });

  export default studentValidationSchema;