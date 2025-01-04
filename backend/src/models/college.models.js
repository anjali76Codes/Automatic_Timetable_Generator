import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-paginate-v2";

const collegeSchema = new Schema(
    {
        collegeName: {
            type: String,
            required: true,
        },
        collegeCode: {
            type: String,
            required: true,
            unique: true
        },
        collegeAddress: {
            type: String,
            required: true,
        },
        collegePrincipal: {
            type: String,
            required: true,
        },

        // Important details
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
        totalFaculties: {
            type: Number,
            required: true,
            min: [0, "Total faculties cannot be negative"]
        },
        totalDepartments: {
            type: Number,
            required: true,
            min: [0, "Total departments cannot be negative"]
        },

        // Reference to other collection (Department model)
        collegeDepartments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Department",
            }
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

collegeSchema.plugin(mongooseAggregatePaginate);

// Create and export the College model
export const College = mongoose.model("College", collegeSchema);
