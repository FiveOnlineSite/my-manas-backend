const Model = require("../../models/scholarships/Documents");

exports.create = async (req, res) => {
  try {
    const files = req.files;

    const doc = new Model({
      title: req.body.title,
      description: req.body.description,

      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
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
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const file = req.files?.[0];
    const existing = await Model.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Document not found" });
    }

    const image = file
      ? {
          url: file.path,
          altText:
            req.body.imageAltText || file.originalname || "Document Image",
        }
      : existing.image;

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      image,
    };

    const updated = await Model.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Documents deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
