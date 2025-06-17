const MasterDonate = require("../../models/masterdonate/MasterDonate");

exports.create = async (req, res) => {
  try {
    const donate = new MasterDonate(req.body);
    await donate.save();
    res.status(201).json(donate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const donate = await MasterDonate.find({ page });
    res.status(200).json(donate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const entries = await MasterDonate.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await MasterDonate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await MasterDonate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
