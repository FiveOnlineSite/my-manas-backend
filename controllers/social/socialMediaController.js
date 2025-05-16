const SocialMediaLink = require("../../models/social/SocialMediaLink");

exports.create = async (req, res) => {
  try {
    const doc = new SocialMediaLink(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await SocialMediaLink.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await SocialMediaLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await SocialMediaLink.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Social Media Link deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
