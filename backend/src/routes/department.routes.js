// In your departmentRoutes.js file
import express from "express";
import { createDepartment, updateDepartment, getDepartment } from "../controllers/departmentController.js";

const router = express.Router();

// Route to create a new department
router.post("/", createDepartment);

// Route to update a department
router.put('/departments/:departmentId', updateDepartment);

// Route to get an existing department's details
router.get('/departments/:departmentId', getDepartment);

export default router;
