import express from "express";
import {
  addAbout,
  deleteAbout,
  getAbout,
  getAboutById,
  updateAbout,
} from "../controllers/aboutControllers.js";

const router = express();
router.get("/", getAbout);
router.get("/:id", getAboutById);
router.post("/", addAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);
export default router;
