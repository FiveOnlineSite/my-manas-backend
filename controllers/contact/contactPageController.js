const ContactPage = require("../../models/contact/ContactPage");

exports.create = async (req, res) => {
  try {
    const doc = new ContactPage(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await ContactPage.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await ContactPage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await ContactPage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact Page deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
