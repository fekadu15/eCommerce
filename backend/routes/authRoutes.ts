import express  from "express";
const router = express.Router();
import { registerUser, loginUser }from "../controllers/authController";

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;