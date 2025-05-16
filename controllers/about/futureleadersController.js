const FutureLeaders = require("../../models/about/FutureLeaders");

exports.createLeader = async (req, res) => {
  try {
    const doc = new FutureLeaders(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaders = async (req, res) => {
  try {
    const data = await FutureLeaders.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeader = async (req, res) => {
  try {
    const updated = await FutureLeaders.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLeader = async (req, res) => {
  try {
    await FutureLeaders.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Future Leader deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
