const FutureLeaders = require("../../models/about/FutureLeaders");

exports.createLeader = async (req, res) => {
  try {
    const files = req.files;
    console.log(files, req.body, "hello");
    console.log(req.body, "consolgfhneeee");

    const leaders = new FutureLeaders({
      title: req.body.title,
      description: req.body.description,
      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
      buttonText: req.body.buttonText,
      buttonLink:  req.body.buttonLink,
    });;
    await leaders.save();
    res.status(201).json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaders = async (req, res) => {
  try {
    const data = await FutureLeaders.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeader = async (req, res) => {
  try {
    const files = req.files;
    const file = files?.[0];

    const existing = await FutureLeaders.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Leader not found" });
    }

    // If a new image is uploaded, replace it; otherwise, keep existing
    const image = file
      ? {
          url: file.path,
          altText: req.body.imageAltText || file.originalname || "Leader Image",
        }
      : existing.image;

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      image,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
    };

    const updated = await FutureLeaders.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Leader Error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteLeader = async (req, res) => {
  try {
    await FutureLeaders.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Future Leader deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
