import Frontend from "../models/Frontend_experence.js";
export const getFrontend_experience = async (req, res) => {
  try {
    const backendinfo = await Frontend.find();
    if (backendinfo.length === 0) {
      return res.status(404).json({ message: "No document found" });
    }
    res.status(200).json(backendinfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const backendinfo = await Frontend.findById(id);
    if (!backendinfo) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(backendinfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createFrontend_experience = async (req, res) => {
  try {
    const backendinfo = req.body;
    const newBackend = new Frontend(backendinfo);
    const savedBackend = await newBackend.save();
    res.status(201).json(savedBackend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const updateFrontend_experience = async (req, res) => {
  try {
    const { id } = req.params;
    const backendUpdate = req.body;
    const backendData = await Frontend.findByIdAndUpdate(id, backendUpdate, {
      new: true,
      runValidators: true,
    });
    if (!backendData) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(backendData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteFrontend_experience = async (req, res) => {
  try {
    const { id } = req.params;
    const backendData = await Frontend.findByIdAndDelete(id);
    if (!backendData) {
      return res.status(404).json({ message: "Document no found" });
    }
    res.status(200).json({ message: "Document successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
