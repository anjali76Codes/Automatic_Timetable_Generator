import { College } from "../models/college.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to handle adding a new college
const addCollege = asyncHandler(async (req, res) => {
    const {
        collegeName,
        collegeCode,
        collegeAddress,
        collegePrincipal,
        totalClasses,
        totalLabs,
        totalFaculties,
        totalDepartments,
    } = req.body;

    // Creating a new college document
    const newCollege = new College({
        collegeName,
        collegeCode,
        collegeAddress,
        collegePrincipal,
        totalClasses,
        totalLabs,
        totalFaculties,
        totalDepartments,
    });

    // Save the college document to the database
    await newCollege.save();

    // Return success response
    return res.status(201).json(new ApiResponse(201, "College added successfully", newCollege));
});

export { addCollege };
