import express from "express";
import multer from "multer";
import Project from "../models/Projects.js";

const storage = multer.memoryStorage(); // Use memory storage to handle files as Buffer
const upload = multer({ storage: storage }).single("project_image"); // Specify the field name for the file

const router = express.Router();

export const addProject = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error: " + err.message });
    } else if (err) {
      return res.status(500).json({ message: "Unknown error: " + err.message });
    }

    const { project_name, demo_link, github_link } = req.body;
    const project_image = req.file
      ? { data: req.file.buffer, contentType: req.file.mimetype }
      : null;

    const projectData = {
      project_name,
      project_image,
      demo_link,
      github_link,
    };

    try {
      const newProject = new Project(projectData);
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

// router.post("/addProject", addProject);

// export default router;
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    const projectsWithBase64Images = projects.map((project) => {
      if (project.project_image && project.project_image.data) {
        // Convert Buffer to base64 string
        const base64Image = project.project_image.data.toString("base64");
        return {
          ...project.toObject(),
          project_image: {
            data: base64Image,
            contentType: project.project_image.contentType,
          },
        };
      }
      return project;
    });
    res.status(200).json(projectsWithBase64Images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectInfo = await Project.findByIdAndDelete(id);
    if (!projectInfo) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
