import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema(
    {
        faculties: [
            {
                facultyId: {
                    type: String,
                    required: true
                },

                facultyName: {
                    type: String,
                    required: true
                },

                teachingSubjects: {
                    type: [String],
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Faculty = mongoose.model("Faculty", facultySchema);