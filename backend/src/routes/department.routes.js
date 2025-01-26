import express from "express";
import { createDepartment, getDepartment, getDepartmentDetails, getDepartmentsByCollegeId, updateDepartment } from "../controllers/departmentController.js";
// import { createDepartment, getDepartment, getDepartmentDetails, getDepartmentsByCollegeId, updateDepartment } from "../controllers/departmentController.js";

const router = express.Router();

// Route to create a new department
router.post("/", createDepartment);

// Route to get an existing department's details
router.get('/departments/:departmentId', getDepartment);
router.get('/departments/college/:collegeId', getDepartmentsByCollegeId);
router.post('/departments/details', getDepartmentDetails);
router.put('/departments/:departmentId', updateDepartment);

export default router;
