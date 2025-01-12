import { Department } from "../models/department.models.js";
import { College } from "../models/college.models.js";
import mongoose from "mongoose";

// Create department (Already provided)
export const createDepartment = async (req, res) => {
  const { departmentId, departmentName, departmentHOD, totalFaculties, totalClasses, totalLabs, collegeId } = req.body;

  // Prevent updating a department after it is created
  if (departmentId) {
    return res.status(400).json({ message: "Department already created, cannot be updated" });
  }

  // Normal department creation logic
  try {
    let department = await Department.findOne({ departmentName, collegeId });

    if (department) {
      return res.status(400).json({ message: "Department already exists for this college" });
    }

    const newDepartment = new Department({
      departmentName,
      departmentHOD,
      totalFaculties,
      totalClasses,
      totalLabs,
    });

    await newDepartment.save();

    const college = await College.findById(collegeId);
    college.collegeDepartments.push(newDepartment._id);
    await college.save();

    res.status(201).json({ message: "Department created successfully", department: newDepartment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const getDepartment = async (req, res) => {
  const { departmentId } = req.params; // Get departmentId from URL parameters

  try {
    // Find the department by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Return the department data
    res.status(200).json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// In your departmentController.js file

export const getDepartmentsByCollegeId = async (req, res) => {
  const { collegeId } = req.params;

  try {
    // Find all departments for the given collegeId
    const departments = await Department.find({ collegeId });

    if (departments.length === 0) {
      return res.status(404).json({ message: "No departments found for this college" });
    }

    // Return department names (you can modify to return more details if necessary)
    const departmentNames = departments.map(department => department.departmentName);

    res.status(200).json({ departmentNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

