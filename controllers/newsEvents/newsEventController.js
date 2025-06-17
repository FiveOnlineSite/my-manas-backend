const NewsEvent = require("../../models/newsEvents/NewsEvent");

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      title,
      uploadDate,
      type,
      content,
      metaTitle,
      metaDescription,
    } = req.body;

    // `upload.any()` gives you an array of files
    const files = req.files;
    const file = files && files.length > 0 ? files[0] : null;

    const doc = new NewsEvent({
      title,
      uploadDate,
      type,
      content,
      metaTitle,
      metaDescription,

      image: file ? { url: file.path } : undefined,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const data = await NewsEvent.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const {
      title,
      uploadDate,
      type,
      content,
      metaTitle,
      metaDescription,

    } = req.body;

    const files = req.files;
    const file = files && files.length > 0 ? files[0] : null;

    const updateData = {
      title,
      uploadDate,
      type,
      content,
      metaTitle,
      metaDescription,

    };

    if (file) {
      updateData.image = {
        url: file.path,
      };
    }

    const updated = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    await NewsEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "News/Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
