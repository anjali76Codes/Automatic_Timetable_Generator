import mongoose, { Schema } from "mongoose";

const departmentSchema = Schema(
    {
        departmentName: {
            type: String,
            required: true,
            unique: true
        },
        departmentHOD: {
            type: String,
        },
        totalFaculties: {
            type: Number,
            min: [0, "Total faculties cannot be negative"]
        },
        totalClasses: {
            type: Number,
            min: [0, "Total classes cannot be negative"]
        },
        totalLabs: {
            type: Number,
            min: [0, "Total labs cannot be negative"]
        },
        totalStudents: {
            type: Number,
            min: [0, "Total students cannot be negative"]
        },
        allocatedClasses: [
            {
                floor: {
                    type: String,
                },
                roomNumbers: [
                    {
                        type: String,
                    }
                ]
            }
        ],
        allocatedLabs: [
            {
                floor: {
                    type: String,
                },
                labNumbers: [
                    {
                        type: String,
                    }
                ]
            }
        ],
        subjectDetails: [
            {
                type: Schema.Types.ObjectId,
                ref: "Subject",
            }
        ],
        semDetails: [
            {
                type: Schema.Types.ObjectId,
                ref: "Semester"
            }
        ],
        faculties: [
            {
                type: Schema.Types.ObjectId,
                ref: "Faculty"
            }
        ]
    }
);

// Check if the model is already defined to avoid overwriting
export const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);
