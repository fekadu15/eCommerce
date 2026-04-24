import express from "express";
const router = express.Router();
import { registerUser, 
    loginUser, 
    updateUserProfile,
    removeUserAddress,
    addUserAddress,
    updateAddress
 } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware"; 

router.post("/register", registerUser);
router.post("/login", loginUser);

router.patch("/profile", protect, updateUserProfile);
router.post("/address", protect, addUserAddress);
router.delete("/address/:id", protect, removeUserAddress);
router.put("/address/:id", protect, updateAddress);
export default router;