import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  const contactData = req.body;

  const newContact = new Contact(contactData);

  try {
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const contactInfo = await Contact.find();

    if (contactInfo.length === 0) {
      return res.status(404).json({ message: "No Document found" });
    }
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getsingleContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contactInfo = await Contact.findById(id);

    if (!contactInfo) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const contactInfo = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!contactInfo) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contactInfo = await Contact.findByIdAndDelete(id);

    if (!contactInfo) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
