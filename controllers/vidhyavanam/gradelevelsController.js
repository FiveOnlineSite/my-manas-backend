const Model = require("../../models/vidhyavanam/GradeLevels");

// CREATE
exports.create = async (req, res) => {
  try {
    const file = req.files?.[0]; // get the uploaded file

    const doc = new Model({
      title: req.body.title,
      description: req.body.description,
      icon: {
        url: file?.path || "",
        altText: req.body.altText || file?.originalname || "Icon",
      },
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const file = req.files?.[0];

    const updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (file) {
      updateData.icon = {
        url: file.path,
        altText: req.body.altText || file.originalname || "Icon",
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

// DELETE
exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "GradeLevel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
