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
      pageUrl,
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
      pageUrl,

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

// GET ONE (by ID)
// exports.getById = async (req, res) => {
//   try {
//     const data = await NewsEvent.findById(req.params.id);
//     if (!data) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }
//     res.status(200).json({ success: true, data });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.getByTitle = async (req, res) => {
//   try {
//     const title = decodeURIComponent(req.params.title); // decode URL-safe strings
//     const newsItem = await NewsEvent.findOne({ title });
//     if (!newsItem) {
//       return res.status(404).json({ success: false, message: "Not found" });
//     }
//     res.status(200).json({ success: true, data: newsItem });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

exports.getByPageUrl = async (req, res) => {
  try {
    const pageUrl = req.params.pageUrl;
    const newsItem = await NewsEvent.findOne({ pageUrl });

    if (!newsItem) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: newsItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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
      pageUrl,

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
      pageUrl,

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
