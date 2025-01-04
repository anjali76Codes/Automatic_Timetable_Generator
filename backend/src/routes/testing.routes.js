import { Router } from "express";
import { testing_logic } from "../controllers/testing.controllers.js";


const router = Router();

router.route("/").get(testing_logic);

export default router;