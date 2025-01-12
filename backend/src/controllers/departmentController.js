import { Department } from "../models/department.models.js";
import { College } from "../models/college.models.js";
import mongoose from "mongoose";

// Create department (Already provided)
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
    collegeId, // Expecting collegeId in the request body
  } = req.body;

  // Input validation
  if (!departmentName || !departmentHOD || totalFaculties < 0 || totalClasses < 0 || totalLabs < 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
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

    // Save the department
    const savedDepartment = await newDepartment.save();

    // Find the college and add the department's ObjectId to the collegeDepartments array
    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Add the department's ObjectId to the collegeDepartments array
    college.collegeDepartments.push(savedDepartment._id);

    // Save the updated college
    await college.save();

    // Return a response
    res.status(201).json({
      message: "Department created successfully and linked to the college",
      department: savedDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update department (New function for editing and updating)
export const updateDepartment = async (req, res) => {
  const {
    departmentId, // The departmentId is expected in the URL params
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
  if (!departmentId || !departmentName || !departmentHOD || totalFaculties < 0 || totalClasses < 0 || totalLabs < 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    // Find the department by its ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Update the department details
    department.departmentName = departmentName;
    department.departmentHOD = departmentHOD;
    department.totalFaculties = totalFaculties;
    department.totalClasses = totalClasses;
    department.totalLabs = totalLabs;
    department.allocatedClasses = allocatedClasses;
    department.allocatedLabs = allocatedLabs;
    department.subjectDetails = subjectDetails;
    department.semDetails = semDetails;
    department.faculties = faculties;

    // Save the updated department
    const updatedDepartment = await department.save();

    // Return a response
    res.status(200).json({
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
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
