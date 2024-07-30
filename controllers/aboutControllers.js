// import express from "express";
// import About from "../models/About.js";
// import multer from "multer";

// const storage = multer.memoryStorage(); // Use memory storage to handle files as Buffer
// const upload = multer({ storage: storage }).fields([
//   { name: "first_image" },
//   { name: "second_image" },
//   { name: "resume" },
// ]); // Specify the field name for the file

// const router = express.Router();

// export const getAbout = async (req, res) => {
//   try {
//     const aboutInfo = await About.find();

//     if (aboutInfo.length === 0) {
//       return res.status(404).json({ message: "No Document found" });
//     }

//     const aboutWithBase64Images = aboutInfo.map((about) => {
//       if (
//         about.first_image &&
//         about.first_image.data &&
//         about.second_image &&
//         about.second_image.data &&
//         about.resume &&
//         about.resume.data
//       ) {
//         // Convert Buffer to base64 string
//         const base64Image = about.first_image.data.toString("base64");
//         const base64Image2 = about.second_image.data.toString("base64");
//         const base64resume = about.resume.data.toString("base64");
//         return {
//           ...about.toObject(),
//           first_image: {
//             data: base64Image,
//             contentType: about.first_image.contentType,
//           },
//           second_image: {
//             data: base64Image2,
//             contentType: about.second_image.contentType,
//           },
//           resume: {
//             data: base64resume,
//             contentType: about.resume.contentType,
//           },
//         };
//       }
//       return about;
//     });

//     res.status(200).json(aboutWithBase64Images);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAboutById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const aboutInfo = await About.findById(id);

//     if (!aboutInfo) {
//       return res.status(404).json({ message: "Document not found" });
//     }

//     res.status(200).json(aboutInfo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const addAbout = (req, res) => {
//   upload(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ message: "Multer error: " + err.message });
//     } else if (err) {
//       return res.status(500).json({ message: "Unknown error: " + err.message });
//     }

//     const {
//       greetings,
//       full_name,
//       title,
//       linkedin,
//       github,
//       years_of_experience,
//       course_studied,
//       description,
//     } = req.body;

//     const first_image = req.files["first_image"]
//       ? {
//           data: req.files["first_image"][0].buffer,
//           contentType: req.files["first_image"][0].mimetype,
//         }
//       : null;

//     const second_image = req.files["second_image"]
//       ? {
//           data: req.files["second_image"][0].buffer,
//           contentType: req.files["second_image"][0].mimetype,
//         }
//       : null;

//     const resume = req.files["resume"]
//       ? {
//           data: req.files["resume"][0].buffer,
//           contentType: req.files["resume"][0].mimetype,
//         }
//       : null;

//     const aboutData = {
//       greetings,
//       full_name,
//       title,
//       first_image,
//       second_image,
//       resume,
//       linkedin,
//       github,
//       years_of_experience,
//       course_studied,
//       description,
//     };

//     try {
//       const newAbout = new About(aboutData);
//       const savedAbout = await newAbout.save();
//       res.status(201).json(savedAbout);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
// };
// export const deleteAbout = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const aboutInfo = await About.findByIdAndDelete(id);
//     if (!aboutInfo) {
//       return res.status(404).json({ message: "Document not found" });
//     }
//     res.status(200).json({ message: "Document deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const updateAbout = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const aboutInfo = await About.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!aboutInfo) {
//       return res.status(404).json({ message: "Document not found" });
//     }

//     res.status(200).json(aboutInfo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// controllers/aboutController.js
import About from "../models/About.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: "first_image" },
  { name: "second_image" },
  { name: "resume" },
]);

export const getAbout = async (req, res) => {
  try {
    const aboutInfo = await About.find().sort({ createdAt: 1 });

    if (aboutInfo.length === 0) {
      return res.status(404).json({ message: "No Document found" });
    }

    const aboutWithBase64Images = aboutInfo.map((about) => {
      if (
        about.first_image &&
        about.first_image.data &&
        about.second_image &&
        about.second_image.data &&
        about.resume &&
        about.resume.data
      ) {
        const base64Image = about.first_image.data.toString("base64");
        const base64Image2 = about.second_image.data.toString("base64");
        const base64resume = about.resume.data.toString("base64");
        return {
          ...about.toObject(),
          first_image: {
            data: base64Image,
            contentType: about.first_image.contentType,
          },
          second_image: {
            data: base64Image2,
            contentType: about.second_image.contentType,
          },
          resume: {
            data: base64resume,
            contentType: about.resume.contentType,
          },
        };
      }
      return about;
    });

    res.status(200).json(aboutWithBase64Images);
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

    const first_image = req.files["first_image"]
      ? {
          data: req.files["first_image"][0].buffer,
          contentType: req.files["first_image"][0].mimetype,
        }
      : null;

    const second_image = req.files["second_image"]
      ? {
          data: req.files["second_image"][0].buffer,
          contentType: req.files["second_image"][0].mimetype,
        }
      : null;

    const resume = req.files["resume"]
      ? {
          data: req.files["resume"][0].buffer,
          contentType: req.files["resume"][0].mimetype,
        }
      : null;

    const aboutData = {
      greetings,
      full_name,
      title,
      first_image,
      second_image,
      resume,
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
