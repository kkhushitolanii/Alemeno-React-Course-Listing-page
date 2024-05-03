import express from "express";
const router = express.Router();
import {
  getCourseDetailsController,
  getCourseListController,
} from "../controllers/courseController.js";

router.get("/courses", getCourseListController);

router.post("/courses", getCourseListController);

router.get("/courses/:courseId", getCourseDetailsController);

export default router;
