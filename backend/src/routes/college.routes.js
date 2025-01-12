import { Router } from "express";
import { addCollege, getCollegeByCode } from "../controllers/college.controllers.js";
import { authenticateUser } from "../middlewares/authenticateUser.middlewares.js";

const router = Router();

router.route("/add-college").post(authenticateUser, addCollege); // Add authentication
router.route("/college/:collegeCode").get(authenticateUser, getCollegeByCode); // Add authentication

export default router;
