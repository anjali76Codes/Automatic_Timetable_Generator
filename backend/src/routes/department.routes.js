import express from "express";
import { createDepartment, getDepartment, getDepartmentDetails, getDepartmentsByCollegeId, updateDepartment } from "../controllers/departmentController.js";

const router = express.Router();

// Route to create a new department
router.post("/", createDepartment);

// Route to update an existing department
router.put('/departments/:departmentId', updateDepartment);

// Route to get an existing department's details
router.get('/departments/:departmentId', getDepartment);
router.get('/departments/college/:collegeId', getDepartmentsByCollegeId);
router.post('/departments/details', getDepartmentDetails);

export default router;
