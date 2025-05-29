const ScopeInstitutions = require("../../models/ourscope/Institutions");

exports.createInstitution = async (req, res) => {
  try {
    const files = req.files;

    const institution = new ScopeInstitutions({
      title: req.body.title,
      description: req.body.description,
      bodName: req.body.bodName,
      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
    });
    await institution.save();
    res.status(201).json(institution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInstitutions = async (req, res) => {
  try {
    const data = await ScopeInstitutions.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInstitution = async (req, res) => {
  try {
    const file = req.files?.[0]; // Handle image upload
    const existing = await ScopeInstitutions.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Institution not found" });
    }

    // If a new file is uploaded, replace it; otherwise keep the existing image
    const image = file
      ? {
          url: file.path,
          altText:
            req.body.imageAltText || file.originalname || "Institution Image",
        }
      : existing.image;

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      bodName: req.body.bodName,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
      image,
    };

    const updated = await ScopeInstitutions.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Institution Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInstitution = async (req, res) => {
  try {
    await ScopeInstitutions.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Institution deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
