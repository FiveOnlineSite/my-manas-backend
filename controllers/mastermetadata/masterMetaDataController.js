const MasterMetaData = require("../../models/mastermetadata/MasterMetaData");

// Create
exports.create = async (req, res) => {
  try {
    const { page, metaTitle, metaDescription, metaKeywords } = req.body;

    const metadata = new MasterMetaData({
      page,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    await metadata.save();
    res.status(201).json(metadata);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all
exports.getAll = async (req, res) => {
  try {
    const data = await MasterMetaData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by page
exports.getByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const result = await MasterMetaData.find({ page });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const { page, metaTitle, metaDescription, metaKeywords } = req.body;

    const updated = await MasterMetaData.findByIdAndUpdate(
      req.params.id,
      {
        page,
        metaTitle,
        metaDescription,
        metaKeywords,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.remove = async (req, res) => {
  try {
    await MasterMetaData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Meta data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
