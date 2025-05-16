const ScopeOverview = require("../../models/ourscope/Overview");

exports.createOverview = async (req, res) => {
  try {
    const doc = new ScopeOverview(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverview = async (req, res) => {
  try {
    const data = await ScopeOverview.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOverview = async (req, res) => {
  try {
    const updated = await ScopeOverview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOverview = async (req, res) => {
  try {
    await ScopeOverview.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Overview deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
