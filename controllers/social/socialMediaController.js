const SocialMediaLink = require("../../models/social/SocialMediaLink");

exports.create = async (req, res) => {
  try {
    const files = req.files;

    const doc = new SocialMediaLink({
      link: req.body.link,
      icon: {
        url: files[0]?.path,
        altText: req.body.iconAltText || "",
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
    const data = await SocialMediaLink.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { link, iconAltText } = req.body;
    const files = req.files || [];
    const file = files.length > 0 ? files[0] : null;

    const updateData = {
      link,
    };

    if (file) {
      updateData.icon = {
        url: file.path,
        altText: iconAltText || file.originalname || "",
      };
    }

    const updated = await SocialMediaLink.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await SocialMediaLink.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Social Media Link deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
