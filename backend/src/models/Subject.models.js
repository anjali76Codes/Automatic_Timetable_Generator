import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({

    subjectDetails: [
        {
            sem: {
                type: String,
                enum: ["Odd", "Even"],
                required: true
            },

            semWiseSubjects: [
                {
                    sem: {
                        type: Number,
                        required: true
                    },
                    classSubjects: {
                        type: [String],
                        required: true
                    },
                    labSubjects: {
                        type: [String],
                        required: true
                    }
                }
            ]
        }
    ]
},
    { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);