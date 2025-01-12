import mongoose from "mongoose";
import { Department } from "../models/department.models.js";
import { College } from "../models/college.models.js";

export const createDepartment = async (req, res) => {
  const { departmentName, departmentHOD, totalFaculties, totalClasses, totalLabs, collegeId } = req.body;

  if (!departmentName || !departmentHOD || totalFaculties < 0 || totalClasses < 0 || totalLabs < 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  // Check if the provided collegeId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(collegeId)) {
    return res.status(400).json({ message: "Invalid college ID" });
  }

  try {
    // Create a new department
    const department = new Department({
      departmentName,
      departmentHOD,
      totalFaculties,
      totalClasses,
      totalLabs,
    });

    const savedDepartment = await department.save();

    // Add the department to the respective college
    const college = await College.findById(collegeId);
    if (college) {
      college.collegeDepartments.push(savedDepartment._id);
      await college.save();
    }

    res.status(201).json({ message: "Department created successfully", department: savedDepartment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
