const AboutUs = require("../../models/home/AboutUs");

exports.createAboutUs = async (req, res) => {
  try {
    const about = new AboutUs(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.find();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAboutUs = async (req, res) => {
  try {
    const updated = await AboutUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAboutUs = async (req, res) => {
  try {
    await AboutUs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "About Us entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
