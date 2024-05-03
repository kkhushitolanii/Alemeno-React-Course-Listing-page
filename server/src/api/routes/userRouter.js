import express from "express";
import {
  enrollIntoCourse,
  getEnrolledCourse,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/enrollment", enrollIntoCourse);

router.get("/enrollment/:user", getEnrolledCourse);

router.get("/enrollment", (req, res) => {
  res.json("ENroll");
});

export default router;
