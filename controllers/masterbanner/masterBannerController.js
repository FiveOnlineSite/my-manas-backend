const MasterBanner = require("../../models/masterbanner/MasterBanner");

exports.create = async (req, res) => {
  try {
    const files = req.files || [];
    const imageFile = files.find((f) => f.fieldname === "image");

    if (!imageFile) {
      return res.status(400).json({ error: "Image is required." });
    }

    const banner = new MasterBanner({
      page: req.body.page,
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
      image: {
        url: imageFile.path, // From Cloudinary
        altText: req.body.altText || "",
      },
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get all MasterBanners
exports.getAll = async (req, res) => {
  try {
    const banners = await MasterBanner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get MasterBanners by page
exports.getByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const banners = await MasterBanner.find({ page });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a MasterBanner
exports.update = async (req, res) => {
  try {
    const file = req.file;

    const {
      page,
      subtitle,
      title,
      description,
      buttonText,
      buttonLink,
      altText,
    } = req.body;

    const updateData = {
      page,
      subtitle,
      title,
      description,
      buttonText,
      buttonLink,
      altText,
    };

    if (file) {
      updateData.image = file.path;
    }

    const updatedBanner = await MasterBanner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedBanner);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a MasterBanner
exports.remove = async (req, res) => {
  try {
    await MasterBanner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
