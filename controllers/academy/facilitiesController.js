const Model = require("../../models/academy/Facilities");

// CREATE
exports.create = async (req, res) => {
  console.log(req.files, req.body, "Facilities Controller");
  try {
    const files = req.files || [];

    const imageFile = files.find((f) => f.fieldname === "image");
    const videoFile = files.find((f) => f.fieldname === "video");
    const featuredImageFile = files.find(
      (f) => f.fieldname === "featuredImage"
    );

    const doc = new Model({
      title: req.body.title,
      resources: {
        image: imageFile && {
          url: imageFile.path,
          altText: req.body.imageAltText || imageFile.originalname,
          // type: "image",
        },
        video: videoFile && {
          url: videoFile.path,
          altText: req.body.videoAltText || videoFile.originalname,
          // type: "video",
        },
        featuredImage: featuredImageFile && {
          url: featuredImageFile.path,
          altText: featuredImageFile.originalname || "Featured",
          // type: "image",
        },
      },
      isFeatured:
        req.body.isFeatured === "true" || req.body.isFeatured === true,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const files = req.files || [];

    const imageFile = files.find((f) => f.fieldname === "image");
    const videoFile = files.find((f) => f.fieldname === "video");
    const featuredImageFile = files.find((f) => f.fieldname === "featuredImage");

    // Get the existing document
    const existingDoc = await Model.findById(req.params.id);
    if (!existingDoc) return res.status(404).json({ message: "Facility not found" });

    const updatedResources = {
      image: imageFile
        ? {
            url: imageFile.path,
            altText: req.body.imageAltText || imageFile.originalname,
          }
        : existingDoc.resources?.image, // preserve if not re-uploaded

      video: videoFile
        ? {
            url: videoFile.path,
            altText: req.body.videoAltText || videoFile.originalname,
          }
        : existingDoc.resources?.video,

      featuredImage: featuredImageFile
        ? {
            url: featuredImageFile.path,
            altText: featuredImageFile.originalname || "Featured",
          }
        : existingDoc.resources?.featuredImage,
    };

    const updateData = {
      title: req.body.title,
      isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
      resources: updatedResources,
    };

    const updated = await Model.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Facility deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
