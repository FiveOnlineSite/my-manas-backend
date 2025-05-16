const Overview = require("../../models/about/Overview");

exports.createOverview = async (req, res) => {
  try {
    const overview = new Overview(req.body);
    await overview.save();
    res.status(201).json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverview = async (req, res) => {
  try {
    const data = await Overview.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOverview = async (req, res) => {
  try {
    const updated = await Overview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOverview = async (req, res) => {
  try {
    await Overview.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Overview deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
