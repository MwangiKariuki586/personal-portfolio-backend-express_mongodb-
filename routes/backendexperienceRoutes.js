import express from "express";
import {
  createBackend_experience,
  deleteBackend_experience,
  getBackend_experience,
  getSingleBackend_experience,
  updateBackend_experience,
} from "../controllers/backendexperienceControllers.js";
const router = express.Router();
router.get("/", getBackend_experience);
router.get("/:id", getSingleBackend_experience);
router.post("/", createBackend_experience);
router.put("/:id", updateBackend_experience);
router.delete("/:id", deleteBackend_experience);
export default router;
