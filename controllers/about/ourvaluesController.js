const OurValues = require("../../models/about/OurValues");

exports.createValues = async (req, res) => {
  try {
    const doc = new OurValues(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getValues = async (req, res) => {
  try {
    const data = await OurValues.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateValues = async (req, res) => {
  try {
    const updated = await OurValues.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteValues = async (req, res) => {
  try {
    await OurValues.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Our Values deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
