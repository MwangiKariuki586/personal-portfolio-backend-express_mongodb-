import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import About from "../models/About.js";

// Convert the ES module URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the ./tmp directory exists
const tempDir = path.join(__dirname, "../tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Cloudinary storage for image files
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowedFormats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, tempDir); // Temporary folder for resume
    } else {
      cb(null, ""); // Cloudinary storage will handle it
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, true); // Accept resume files
    } else {
      cb(null, true); // Allow Cloudinary storage to handle all files
    }
  },
}).fields([
  { name: "first_image_url" },
  { name: "second_image_url" },
  { name: "resume" },
]);

export const addAbout = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error: " + err.message });
    } else if (err) {
      return res.status(500).json({ message: "Unknown error: " + err.message });
    }

    const {
      greetings,
      full_name,
      title,
      linkedin,
      github,
      years_of_experience,
      course_studied,
      description,
    } = req.body;

    // Initialize image URLs
    let firstImageUrl = null;
    let secondImageUrl = null;

    // Handle Cloudinary uploads
    if (req.files["first_image_url"]) {
      const firstImagePath = req.files["first_image_url"][0].path;
      firstImageUrl = await cloudinary.uploader
        .upload(firstImagePath, {
          folder: "uploads",
          public_id: `${Date.now()}-${
            req.files["first_image_url"][0].originalname
          }`,
        })
        .then((result) => result.secure_url);
    }

    if (req.files["second_image_url"]) {
      const secondImagePath = req.files["second_image_url"][0].path;
      secondImageUrl = await cloudinary.uploader
        .upload(secondImagePath, {
          folder: "uploads",
          public_id: `${Date.now()}-${
            req.files["second_image_url"][0].originalname
          }`,
        })
        .then((result) => result.secure_url);
    }

    // Handle resume upload
    let resumeData = null;
    let resumeContentType = null;
    if (req.files["resume"]) {
      const resumePath = req.files["resume"][0].path;
      resumeData = fs.readFileSync(resumePath);
      resumeContentType = req.files["resume"][0].mimetype;
    }

    const aboutData = {
      greetings,
      full_name,
      title,
      first_image_url: firstImageUrl,
      second_image_url: secondImageUrl,
      resume: resumeData
        ? { data: resumeData, contentType: resumeContentType }
        : undefined,
      linkedin,
      github,
      years_of_experience,
      course_studied,
      description,
    };

    try {
      const newAbout = new About(aboutData);
      const savedAbout = await newAbout.save();
      res.status(201).json(savedAbout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

// export const getAbout = async (req, res) => {
//   try {
//     const aboutInfo = await About.find().sort({ createdAt: 1 });

//     if (aboutInfo.length === 0) {
//       return res.status(404).json({ message: "No Document found" });
//     }
//     res.status(200).json(aboutInfo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
//};
export const getAbout = async (req, res) => {
  try {
    const aboutInfo = await About.find();
    if (aboutInfo.length === 0) {
      return res.status(404).json({ message: "No Document found" });
    }

    const aboutWithBase64 = aboutInfo.map((about) => {
      if (about.resume && about.resume.data) {
        // Convert Buffer to base64 string
        const base64resume = about.resume.data.toString("base64");
        return {
          ...about.toObject(),
          resume: {
            data: base64resume,
            contentType: about.resume.contentType,
          },
        };
      }
      return about.toObject();
    });

    res.status(200).json(aboutWithBase64);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutInfo = await About.findById(id);

    if (!aboutInfo) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutInfo = await About.findByIdAndDelete(id);
    if (!aboutInfo) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const aboutInfo = await About.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!aboutInfo) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
