const AboutUs = require("../../models/home/AboutUs");

exports.createAboutUs = async (req, res) => {
  try {
    const files = req.files;
    console.log(files, req.body, "rifhruhrugh");

    console.log(req.body, "consolreeee");
    // const about = new AboutUs(req.body);
    const about = new AboutUs({
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
    });
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.find();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAboutUs = async (req, res) => {
  try {
    const {
      subtitle,
      title,
      description,
      buttonText,
      buttonLink,
      imageAltText,
    } = req.body;
    const files = req.files;
    const file = files && files.length > 0 ? files[0] : null;

    const updateData = {
      subtitle,
      title,
      description,
      buttonText,
      buttonLink,
    };

    if (file) {
      updateData.image = {
        url: file.path,
        altText: imageAltText || file.originalname || "",
      };
    }

    const updated = await AboutUs.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAboutUs = async (req, res) => {
  try {
    await AboutUs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "About Us entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
