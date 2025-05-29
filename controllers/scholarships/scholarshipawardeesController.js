const Model = require("../../models/scholarships/ScholarshipAwardees");

exports.create = async (req, res) => {
  try {
    const files = req.files; // Array of icons
    const parsedAwardees = JSON.parse(req.body.awardees); // [{ title, description }]
    const awardeesWithImages = parsedAwardees.map((awardee, index) => {
      const imageFile = files[index];
      return {
        ...awardee,
        image: imageFile
          ? {
              url: imageFile.path,
              altText: awardee.name || "",
            }
          : null,
      };
    });

    const doc = new Model({
      title: req.body.title,
      awardees: awardeesWithImages,
    });;
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const files = req.files; // New uploaded image files
    const parsedAwardees = JSON.parse(req.body.awardees); // Awardees from the request body

    const existingDoc = await Model.findById(req.params.id);
    if (!existingDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    const updatedAwardees = parsedAwardees.map((awardee, index) => {
      const newImageFile = files?.[index];
      const existingAwardee = existingDoc.awardees?.[index];

      return {
        name: awardee.name,
        review: awardee.review,
        year: awardee.year,
        institute: awardee.institute,
        image: newImageFile
          ? {
              url: newImageFile.path,
              altText: awardee.name || newImageFile.originalname || "",
            }
          : existingAwardee?.image || null,
      };
    });

    const updateData = {
      title: req.body.title,
      awardees: updatedAwardees,
    };

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedDoc);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "ScholarshipAwardees deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
