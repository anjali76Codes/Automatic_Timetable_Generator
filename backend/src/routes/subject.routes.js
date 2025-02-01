import express from "express";
import { addSubject } from "../controllers/subject.controllers.js";

const router = express.Router();

// Route to create a new department
router.post("/add-subject", addSubject);

export default router;