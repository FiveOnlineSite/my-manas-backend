const MasterContact = require("../../models/mastercontact/MasterContact");

exports.create = async (req, res) => {
  try {
    const { subtitle, title, submitButtonText, imageUrl, altText } = req.body;

    const entry = new MasterContact({
      subtitle,
      title,
      submitButtonText,
      image: {
        url: imageUrl,
        altText: altText || ""
      }
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const entries = await MasterContact.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { subtitle, title, submitButtonText, imageUrl, altText } = req.body;

    const updateData = {
      subtitle,
      title,
      submitButtonText,
      image: {
        url: imageUrl,
        altText: altText || ""
      }
    };

    const updated = await MasterContact.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await MasterContact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
