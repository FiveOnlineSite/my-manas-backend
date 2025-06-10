const Model = require("../../models/vidhyavanam/History");

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
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const file = req.files?.[0];
    const existingDoc = await Model.findById(req.params.id);
        if (!existingDoc) {
          return res.status(404).json({ error: "Entry not found" });
        }
    
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
     else if (req.body.altText && existingDoc.logo) {
      updateData.logo = {
        ...existingDoc.logo,
        altText: req.body.altText,
      };
    }
    const updated = await Model.findByIdAndUpdate(req.params.id,updateData, { new: true });
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
