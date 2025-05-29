const ScopeBanner = require("../../models/ourscope/Banner");

exports.createBanner = async (req, res) => {
  try {
    const files = req.files;

    const banner = new ScopeBanner({
      title: req.body.title,
      image: {
        url: files[0]?.path,
        altText: req.body.altText || "",
      },
    });;
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const data = await ScopeBanner.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const files = req.files;
    const file = files?.[0]; // Assuming single image file

    const existing = await ScopeBanner.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Banner not found" });
    }

    const updatedImage = file
      ? {
          url: file.path,
          altText: req.body.altText || file.originalname || "Banner Image",
        }
      : existing.image; // Use existing image if no new one

    const updateData = {
      title: req.body.title,
      image: updatedImage,
    };

    const updated = await ScopeBanner.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Banner Error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteBanner = async (req, res) => {
  try {
    await ScopeBanner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
