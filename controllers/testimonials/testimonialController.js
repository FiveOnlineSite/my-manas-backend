const Testimonial = require("../../models/testimonials/Testimonial");

exports.create = async (req, res) => {
  try {
    const files = req.files;
    const doc = new Testimonial({
      name: req.body.name,
      designation: req.body.designation,
      location: req.body.location,
      description: req.body.description,
      image: {
        url: files[0]?.path,
        altText: req.body.altText || "",
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
    const data = await Testimonial.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, designation, location, altText,description  } = req.body;
    const files = req.files || [];
    const file = files.length > 0 ? files[0] : null;

    const updateData = {
      name,
      designation,
      location,
      description,
    };

    if (file) {
      updateData.image = {
        url: file.path,
        altText: altText || file.originalname || "",
      };
    }

    const updated = await Testimonial.findByIdAndUpdate(
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
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
