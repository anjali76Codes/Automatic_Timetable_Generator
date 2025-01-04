import { Router } from "express";
import { addCollege } from "../controllers/college.controllers.js";



const router = Router();

router.route("/add-college").post(addCollege);

export default router;