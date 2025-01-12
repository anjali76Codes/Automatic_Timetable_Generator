import { College } from "../models/college.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";



// Controller to handle adding a new college
const addCollege = asyncHandler(async (req, res) => {
    const {
        collegeName,
        collegeCode,
        collegeAddress,
        collegePrincipal,
        totalClasses,
        totalLabs,
        totalFloors,
        totalFaculties,
        totalDepartments,
    } = req.body;

    const userId = req.user.userId; // Get userId from middleware

    // Create a new college document
    const newCollege = new College({
        collegeName,
        collegeCode,
        collegeAddress,
        collegePrincipal,
        totalClasses,
        totalLabs,
        totalFloors,
        totalFaculties,
        totalDepartments,
        createdBy: userId, // Associate college with the logged-in user
    });

    // Save the college document to the database
    const savedCollege = await newCollege.save();

    // Optionally: Add the college to the user's profile
    await User.findByIdAndUpdate(userId, {
        $push: { colleges: savedCollege._id },
    });

    // Return the college ID in the response
    return res.status(201).json(new ApiResponse(201, "College added successfully", { 
        collegeId: savedCollege._id, 
        collegeDetails: savedCollege 
    }));
});




// Controller to get a college by its code
const getCollegeByCode = asyncHandler(async (req, res) => {
    const { collegeCode } = req.params;
    const userId = req.user.userId; // Get userId from middleware

    // Fetch the college by collegeCode and ensure it belongs to the logged-in user
    const college = await College.findOne({ collegeCode, createdBy: userId });

    if (!college) {
        return res.status(404).json(new ApiResponse(404, "College not found or not accessible by this user"));
    }

    return res.status(200).json(new ApiResponse(200, "College details fetched successfully", college));
});






// const checkCollegeStatus = async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.json({ hasSubmittedCollege: user.hasSubmittedCollege });
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   };

export { getCollegeByCode, addCollege  };
