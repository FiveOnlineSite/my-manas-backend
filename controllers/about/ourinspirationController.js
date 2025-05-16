const OurInspiration = require("../../models/about/OurInspiration");

exports.createInspiration = async (req, res) => {
  try {
    const doc = new OurInspiration(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInspiration = async (req, res) => {
  try {
    const data = await OurInspiration.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInspiration = async (req, res) => {
  try {
    const updated = await OurInspiration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInspiration = async (req, res) => {
  try {
    await OurInspiration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Our Inspiration deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
