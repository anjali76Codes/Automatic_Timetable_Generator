import mongoose, { Schema } from "mongoose";

const semesterSchema = new Schema(
    {
        semDetails: [
            {
                sem: {
                    type: String,
                    enum: ["Odd", "Even"],
                    required: true
                },

                semWiseDetails: [
                    {
                        sem: {
                            type: Number,
                            required: true
                        },

                        noOfStudents: {
                            type: Number,
                            required: true
                        },

                        noOfDivisions: {
                            type: Number,
                            required: true,
                            min: [1, 'There must be at least one division']
                        },

                        divisions: [
                            {
                                division: {
                                    type: String,
                                    required: true
                                },

                                noOfStudents: {
                                    type: Number,
                                    required: true,
                                    min: [0, 'Number of students cannot be negative']
                                },

                                noOfBatches: {
                                    type: Number,
                                    required: true,
                                    min: [1, 'There must be at least one batch']
                                },

                                batches: [
                                    {
                                        batchName: {
                                            type: String,
                                            required: true
                                        },

                                        noOfStudents: {
                                            type: Number,
                                            required: true,
                                            min: [0, 'Number of students cannot be negative']
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Semester = mongoose.model("Semester", semesterSchema);
