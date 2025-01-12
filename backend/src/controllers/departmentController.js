import { Department } from "../models/department.models.js";
import mongoose from "mongoose";

export const createDepartment = async (req, res) => {
  const {
    departmentName,
    departmentHOD,
    totalFaculties,
    totalClasses,
    totalLabs,
    allocatedClasses,
    allocatedLabs,
    subjectDetails,
    semDetails,
    faculties,
  } = req.body;

  // Input validation
  if (!departmentName || !departmentHOD || totalFaculties < 0 || totalClasses < 0 || totalLabs < 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  // Create a new department
  const newDepartment = new Department({
    departmentName,
    departmentHOD,
    totalFaculties,
    totalClasses,
    totalLabs,
    allocatedClasses,
    allocatedLabs,
    subjectDetails,
    semDetails,
    faculties,
  });

  try {
    // Save the department
    const savedDepartment = await newDepartment.save();

    res.status(201).json({
      message: "Department created successfully",
      department: savedDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
