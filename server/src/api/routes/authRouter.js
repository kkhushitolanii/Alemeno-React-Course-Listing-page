import express from "express";
const router = express.Router();
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
