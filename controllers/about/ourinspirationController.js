const OurInspiration = require("../../models/about/OurInspiration");

exports.createInspiration = async (req, res) => {
  try {
    const files = req.files;
    console.log(files, req.body, "hello");
    console.log(req.body, "consolgfhneeee");

    const inspiration = new OurInspiration({
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
    });
    await inspiration.save();
    res.status(201).json(inspiration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInspiration = async (req, res) => {
  try {
    const data = await OurInspiration.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInspiration = async (req, res) => {
  try {
    const files = req.files;
    const file = files?.[0];

    const existingDoc = await OurInspiration.findById(req.params.id);
    if (!existingDoc) {
      return res.status(404).json({ error: "Inspiration entry not found" });
    }

    // Construct the updated image object
    const image = file
      ? {
          url: file.path,
          altText:
            req.body.imageAltText || file.originalname || "Inspiration Image",
        }
      : existingDoc.image; // Keep old image if not replaced

    const updatedData = {
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
      image,
    };

    const updated = await OurInspiration.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Inspiration Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInspiration = async (req, res) => {
  try {
    await OurInspiration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Our Inspiration deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
