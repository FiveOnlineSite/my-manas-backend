const Mission = require("../../models/home/Mission");

exports.createMission = async (req, res) => {
  try {
    const files = req.files;
    console.log(files, req.body, "rifhruhffffrugh");

    console.log(req.body, "consolreeee");
    const mission = new Mission({
      subtitle: req.body.subtitle,
      title: req.body.title,
      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
      accordions: JSON.parse(req.body.accordions),
      // title: req.body.title,
      // description: req.body.description,
    });
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.status(200).json(missions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMission = async (req, res) => {
  try {
    const files = req.files;
    const file = files && files.length > 0 ? files[0] : null;

    // Parse accordions from string to JSON
    const accordions = JSON.parse(req.body.accordions || "[]");

    const updateData = {
      subtitle: req.body.subtitle,
      title: req.body.title,
      accordions,
    };

    // Only update image if a new file was uploaded
    if (file) {
      updateData.image = {
        url: file.path,
        altText: req.body.imageAltText || file.originalname || "Mission Image",
      };
    }

    const updated = await Mission.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Mission update error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Mission entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
