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
            required: true
        },
        totalFaculties: {
            type: Number,
            required: true,
            min: [0, "Total faculties cannot be negative"]
        },
        totalClasses: {
            type: Number,
            required: true,
            min: [0, "Total classes cannot be negative"]
        },
        totalLabs: {
            type: Number,
            required: true,
            min: [0, "Total labs cannot be negative"]
        },
        allocatedClasses: [
            {
                floor: {
                    type: String,
                    required: true
                },
                roomNumbers: [
                    {
                        type: String,
                        required: true
                    }
                ]
            }
        ],
        allocatedLabs: [
            {
                floor: {
                    type: String,
                    required: true
                },
                labNumbers: [
                    {
                        type: String,
                        required: true
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
)

export const Department = mongoose.model("Department", departmentSchema);