import { Schema, model } from "mongoose";
import { TacademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TacademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

//Model

export const academicFaculty = model<TacademicFaculty>('academicFaculty', academicFacultySchema);