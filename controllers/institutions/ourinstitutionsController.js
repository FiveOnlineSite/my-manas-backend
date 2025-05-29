const Model = require("../../models/institutions/OurInstitutions");

// exports.create = async (req, res) => {
//   try {
//     const doc = new Model(req.body);
//     await doc.save();
//     res.status(201).json(doc);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.create = async (req, res) => {
  try {
    const { title, altText } = req.body;
    const file = req.files?.[0]; // Get the first file from the array

    if (!file || (!file.path && !file.secure_url)) {
      return res.status(400).json({ error: "Image upload failed." });
    }

    const newDoc = new Model({
      title,
      image: {
        url: file.secure_url || file.path || "", // Cloudinary URL (secure_url) or fallback to local path
        altText: altText || file.originalname || "Institution Image",
      },
    });

    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    console.error("Create error:", err);
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

// exports.update = async (req, res) => {
//   try {
//     const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.update = async (req, res) => {
  try {
    const { title, altText } = req.body;
    const file = req.files?.[0]; // Get the first file

    let updateData = {
      title,
    };

    if (file) {
      updateData.image = {
        url: file.secure_url || file.path || "",
        altText: altText || file.originalname || "Institution Image",
      };
    }

    const updated = await Model.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "OurInstitutions deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
