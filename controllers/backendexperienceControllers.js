import Backend from "../models/Backend_experience.js";
export const getBackend_experience = async (req, res) => {
  try {
    const backendinfo = await Backend.find();
    if (backendinfo.length === 0) {
      return res.status(404).json({ message: "No document found" });
    }
    res.status(200).json(backendinfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSingleBackend_experience = async (req, res) => {
  try {
    const { id } = req.params;
    const backendinfo = await Backend.findById(id);
    if (!backendinfo) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(backendinfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createBackend_experience = async (req, res) => {
  try {
    const backendinfo = req.body;
    const newBackend = new Backend(backendinfo);
    const savedBackend = await newBackend.save();
    res.status(201).json(savedBackend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const updateBackend_experience = async (req, res) => {
  try {
    const { id } = req.params;
    const backendUpdate = req.body;
    const backendData = await Backend.findByIdAndUpdate(id, backendUpdate, {
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

export const deleteBackend_experience = async (req, res) => {
  try {
    const { id } = req.params;
    const backendData = await Backend.findByIdAndDelete(id);
    if (!backendData) {
      return res.status(404).json({ message: "Document no found" });
    }
    res.status(200).json({ message: "Document successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
