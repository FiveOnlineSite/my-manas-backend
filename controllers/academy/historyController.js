const Model = require("../../models/academy/History");

exports.create = async (req, res) => {
  try {
    const file = req.files?.[0];

    const doc = new Model({
      title: req.body.title,
      description: req.body.description,
      logo: {
        url: file?.path || "",
        altText: req.body.altText || file?.originalname || "Logo",
      },
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Model.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const file = req.files?.[0];

    const updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (file) {
      updateData.logo = {
        url: file.path,
        altText: req.body.altText || file.originalname || "Logo",
      };
    }

    const updated = await Model.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "History deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
