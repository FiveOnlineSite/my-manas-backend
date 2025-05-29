const Overview = require("../../models/about/Overview");

exports.createOverview = async (req, res) => {
  try {
    const files = req.files;

    const overview = new Overview({
      title: req.body.title,
      description1: req.body.description1,
      description2: req.body.description2,
      bodName: req.body.bodName,
      bodImage: {
        url: files[0]?.path,
        altText: req.body.bodImageAltText || "",
      },
      bodSignature: {
        url: files[1]?.path,
        altText: req.body.bodSignatureImageAltText || "",
      },
    });
    await overview.save();
    res.status(201).json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverview = async (req, res) => {
  try {
    const data = await Overview.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOverview = async (req, res) => {
  try {
    const files = req.files || [];
    const updateData = {
      title: req.body.title,
      description1: req.body.description1,
      description2: req.body.description2,
      bodName: req.body.bodName,
    };

    // Update bodImage if provided
    if (files[0]) {
      updateData.bodImage = {
        url: files[0].path,
        altText:
          req.body.bodImageAltText || files[0].originalname || "BOD Image",
      };
    }

    // Update bodSignature if provided
    if (files[1]) {
      updateData.bodSignature = {
        url: files[1].path,
        altText:
          req.body.bodSignatureImageAltText ||
          files[1].originalname ||
          "BOD Signature",
      };
    }

    const updated = await Overview.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOverview = async (req, res) => {
  try {
    await Overview.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Overview deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
