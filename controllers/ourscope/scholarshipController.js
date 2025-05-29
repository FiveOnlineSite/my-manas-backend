const ScopeScholarship = require("../../models/ourscope/Scholarship");

exports.createScholarship = async (req, res) => {
  try {
    const files = req.files;

    const scholarship = new ScopeScholarship({
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
      image1: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
      image2: {
        url: files[1]?.path,
        altText: req.body.imageAltText || "",
      },
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
    });;
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScholarship = async (req, res) => {
  try {
    const data = await ScopeScholarship.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const files = req.files || [];
    const file1 = files[0];
    const file2 = files[1];

    const existing = await ScopeScholarship.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Scholarship entry not found" });
    }

    const image1 = file1
      ? {
          url: file1.path,
          altText: req.body.imageAltText1 || file1.originalname || "Image 1",
        }
      : existing.image1;

    const image2 = file2
      ? {
          url: file2.path,
          altText: req.body.imageAltText2 || file2.originalname || "Image 2",
        }
      : existing.image2;

    const updatedData = {
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
      image1,
      image2,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
    };

    const updated = await ScopeScholarship.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Scholarship Error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteScholarship = async (req, res) => {
  try {
    await ScopeScholarship.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Scholarship deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
