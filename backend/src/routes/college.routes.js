import { Router } from "express";
import { addCollege, getCollegeByCode } from "../controllers/college.controllers.js";
import { authenticateUser } from "../middlewares/authenticateUser.middlewares.js";
import { getCollegeDetails, getUserColleges } from "../controllers/user.controllers.js";

const router = Router();

router.route("/add-college").post(authenticateUser, addCollege); // Add authentication
router.route("/college/:collegeCode").get(authenticateUser, getCollegeByCode); // Add authentication
router.route("/colleges").get(authenticateUser, getUserColleges); // Add authentication
router.route("/colleges/:collegeId").get(authenticateUser, getCollegeDetails);

export default router;
