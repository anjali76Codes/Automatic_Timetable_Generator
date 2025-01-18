
import { Department } from "../models/department.models.js";
import { College } from "../models/college.models.js";
import mongoose from "mongoose";

// Create department (Already provided)
export const createDepartment = async (req, res) => {
  const { departmentId, departmentName, departmentHOD, totalFaculties, totalClasses, totalLabs, totalStudents, collegeId } = req.body;

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
      totalStudents,  // Include totalStudents
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
  const { departmentId } = req.params;

  // Check if the departmentId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    return res.status(400).json({ message: "Invalid department ID" });
  }

  try {
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

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


export const getDepartmentDetails = async (req, res) => {
  try {
    // Get department IDs from request body
    const departmentIds = req.body.departmentIds;

    // Ensure departmentIds is an array
    if (!Array.isArray(departmentIds)) {
      return res.status(400).json({ message: 'departmentIds should be an array' });
    }

    // Query the departments from the database by IDs
    const departments = await Department.find({ '_id': { $in: departmentIds } });

    // If no departments were found
    if (departments.length === 0) {
      return res.status(404).json({ message: 'No departments found for the given IDs' });
    }

    // Return the found departments
    return res.status(200).json(departments);
  } catch (error) {
    console.error('Error fetching department details:', error);
    return res.status(500).json({ message: 'Failed to fetch department details' });
  }
};





// Controller to update department information
export const updateDepartment = async (req, res) => {
  const { departmentId } = req.params;
  const { departmentName, departmentHOD, totalFaculties, totalClasses, totalLabs, totalStudents } = req.body;

  // Check if the departmentId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    return res.status(400).json({ message: "Invalid department ID" });
  }

  try {
    let department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.departmentName = departmentName || department.departmentName;
    department.departmentHOD = departmentHOD || department.departmentHOD;
    department.totalFaculties = totalFaculties || department.totalFaculties;
    department.totalClasses = totalClasses || department.totalClasses;
    department.totalLabs = totalLabs || department.totalLabs;
    department.totalStudents = totalStudents || department.totalStudents;

    await department.save();

    res.status(200).json({ message: "Department updated successfully", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update department", error: error.message });
  }
};
