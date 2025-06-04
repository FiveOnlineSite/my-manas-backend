const Model = require("../../models/vidhyavanam/Facilities");

exports.create = async (req, res) => {
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
    const files = req.files || [];

    const imageFile = files.find((f) => f.fieldname === "image");
    const videoFile = files.find((f) => f.fieldname === "video");
    const featuredImageFile = files.find(
      (f) => f.fieldname === "featuredImage"
    );

    const updateData = {
      title: req.body.title,
      isFeatured:
        req.body.isFeatured === "true" || req.body.isFeatured === true,
    };

    updateData.resources = {};

    if (imageFile) {
      updateData.resources.image = {
        url: imageFile.path,
        altText: req.body.imageAltText || imageFile.originalname,
        // type: "image",
      };
    }

    if (videoFile) {
      updateData.resources.video = {
        url: videoFile.path,
        altText: req.body.videoAltText || videoFile.originalname,
        // type: "video",
      };
    }

    if (featuredImageFile) {
      updateData.resources.featuredImage = {
        url: featuredImageFile.path,
        altText: featuredImageFile.originalname || "Featured",
        // type: "image",
      };
    }
    const updated = await Model.findByIdAndUpdate(req.params.id,updateData, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Facilities deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
