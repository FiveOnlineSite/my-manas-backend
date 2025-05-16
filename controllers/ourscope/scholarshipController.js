const ScopeScholarship = require("../../models/ourscope/Scholarship");

exports.createScholarship = async (req, res) => {
  try {
    const doc = new ScopeScholarship(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScholarship = async (req, res) => {
  try {
    const data = await ScopeScholarship.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const updated = await ScopeScholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteScholarship = async (req, res) => {
  try {
    await ScopeScholarship.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Scholarship deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
