const ScopeInstitutions = require("../../models/ourscope/Institutions");

exports.createInstitution = async (req, res) => {
  try {
    const doc = new ScopeInstitutions(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInstitutions = async (req, res) => {
  try {
    const data = await ScopeInstitutions.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInstitution = async (req, res) => {
  try {
    const updated = await ScopeInstitutions.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInstitution = async (req, res) => {
  try {
    await ScopeInstitutions.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Institution deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
