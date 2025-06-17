const Model = require("../../models/institutions/OurModel");

exports.create = async (req, res) => {
  try {
    const files = req.files;
    const { title, description } = req.body;

    // Parse icons JSON from string to array
    const parsedIcons = JSON.parse(req.body.icons || "[]");

    const icons = parsedIcons.map((item, index) => {
      const file = files[index];
      return {
        icon: {
          url: file?.path || "",
          altText: file?.originalname || item.title || "Icon",
        },
        title: item.title,
        description: item.description,
      };
    });

    const newDoc = new Model({ title, description, icons });
    await newDoc.save();

    res.status(201).json(newDoc);
  } catch (err) {
    console.error(err);
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
    const files = req.files || [];
    const { title, description } = req.body;

    const parsedIcons = JSON.parse(req.body.icons || "[]");

    const existingDoc = await Model.findById(req.params.id);
    if (!existingDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    let fileIndex = 0;

    const updatedIcons = parsedIcons.map((item, index) => {
      const existingIcon = existingDoc.icons?.[index];

      let file = null;

      if (item.hasNewIcon && files[fileIndex]) {
        file = files[fileIndex];
        fileIndex++;
      }

      return {
        icon: file
          ? {
              url: file.path,
              altText: file.originalname || item.title || "Icon",
            }
          : existingIcon?.icon || {
              url: "",
              altText: item.title || "Icon",
            },
        title: item.title,
        description: item.description,
      };
    });

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      { title, description, icons: updatedIcons },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "OurModel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
